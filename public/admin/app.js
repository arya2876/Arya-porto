/**
 * Admin Panel JavaScript — Portfolio CMS
 * Vercel Serverless + Supabase Edition
 * v2.0 — Certificate upload (image/PDF/Word), sinkron dengan halaman utama
 */
const API = '/api';
let currentSection = 'dashboard';
let authToken = localStorage.getItem('adminToken') || null;

// ===========================
// Menu Configuration
// ===========================
const sections = [
    { id: 'dashboard',   label: '📊 Dashboard'       },
    { id: 'personal',    label: '👤 Personal Info'    },
    { id: 'experience',  label: '📋 Experience'       },
    { id: 'projects',    label: '🎨 Projects'         },
    { id: 'services',    label: '🛠️ Services'         },
    { id: 'certificates', label: '🏆 Certificates'    },
    { id: 'skills',      label: '⚡ Skills'           },
    { id: 'messages',    label: '💬 Messages'         },
];

// ===========================
// Auth (JWT)
// ===========================
async function doLogin() {
    const u = document.getElementById('loginUser').value.trim();
    const p = document.getElementById('loginPass').value;
    if (!u || !p) { showLoginError('Please enter username and password'); return; }
    try {
        const r = await fetch(`${API}/auth?action=login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        });
        const d = await r.json();
        if (d.success) {
            authToken = d.token;
            localStorage.setItem('adminToken', authToken);
            showApp(d.user);
        } else { showLoginError(d.error || 'Login failed'); }
    } catch (e) { showLoginError('Cannot connect to server. Check env vars.'); }
}

function showApp(user) {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('appPage').classList.remove('hidden');
    document.getElementById('adminName').textContent = user.name || user.username;
    buildNav();
    loadSection('dashboard');
}

function showLoginError(msg) {
    const el = document.getElementById('loginError');
    el.textContent = msg;
    el.classList.remove('hidden');
}

function doLogout() {
    authToken = null;
    localStorage.removeItem('adminToken');
    location.reload();
}

async function checkAuth() {
    if (!authToken) return;
    try {
        const r = await fetch(`${API}/auth?action=check`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const d = await r.json();
        if (d.authenticated) {
            showApp(d.user);
        } else {
            authToken = null;
            localStorage.removeItem('adminToken');
        }
    } catch (e) { /* not logged in */ }
}

// ===========================
// Navigation
// ===========================
function buildNav() {
    const nav = document.getElementById('navMenu');
    nav.innerHTML = sections.map(s =>
        `<button class="nav-item ${s.id === currentSection ? 'active' : ''}" onclick="loadSection('${s.id}')">${s.label}</button>`
    ).join('');
}

function loadSection(id) {
    currentSection = id;
    const sec = sections.find(s => s.id === id);
    document.getElementById('pageTitle').textContent = sec ? sec.label.replace(/^.{2}/, '').trim() : id;
    buildNav();
    const loaders = {
        dashboard: loadDashboard,
        personal: loadPersonal,
        experience: loadExperience,
        projects: loadProjects,
        services: loadServices,
        certificates: loadCertificates,
        skills: loadSkills,
        messages: loadMessages,
    };
    (loaders[id] || loadDashboard)();
}

// ===========================
// API Helpers (JWT auth)
// ===========================
async function api(endpoint, method = 'GET', body = null) {
    const opts = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
        }
    };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(`${API}/${endpoint}`, opts);
    if (!r.ok && r.status !== 200) {
        const err = await r.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${r.status}`);
    }
    return r.json();
}

function toast(msg, type = 'success') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 4000);
}

function openModal(title, bodyHtml, footerHtml) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    document.getElementById('modalFooter').innerHTML = footerHtml;
    document.getElementById('modalOverlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
}

function formField(label, name, value = '', type = 'text', extra = '') {
    if (type === 'textarea') return `<div class="form-group"><label>${label}</label><textarea class="form-control" id="f_${name}" ${extra}>${value || ''}</textarea></div>`;
    if (type === 'select') return `<div class="form-group"><label>${label}</label><select class="form-control" id="f_${name}">${extra}</select></div>`;
    if (type === 'checkbox') return `<div class="form-group"><label><input type="checkbox" id="f_${name}" ${value ? 'checked' : ''}> ${label}</label></div>`;
    return `<div class="form-group"><label>${label}</label><input type="${type}" class="form-control" id="f_${name}" value="${value || ''}" ${extra}></div>`;
}

function getField(name) {
    const el = document.getElementById('f_' + name);
    if (!el) return '';
    if (el.type === 'checkbox') return el.checked;
    return el.value;
}

// ===========================
// File Upload (Supabase Storage)
// Supports: image, PDF, Word
// ===========================
function certFileUploadField(label, name, currentUrl = '') {
    const isDoc = currentUrl && (currentUrl.endsWith('.pdf') || currentUrl.includes('.doc'));
    const previewHtml = currentUrl
        ? isDoc
            ? `<a href="${currentUrl}" target="_blank" class="btn btn-ghost btn-sm" style="margin-top:8px">📄 View current file</a>`
            : `<img src="${currentUrl}" style="max-width:200px;margin-top:8px;border-radius:8px;border:1px solid var(--border)" alt="preview">`
        : '';
    return `<div class="form-group">
        <label>${label}</label>
        <input type="hidden" id="f_${name}" value="${currentUrl || ''}">
        <div style="display:flex;flex-direction:column;gap:8px;padding:16px;border:2px dashed var(--border);border-radius:8px;text-align:center" id="dropzone_${name}"
            ondragover="event.preventDefault();this.style.borderColor='var(--accent)'"
            ondragleave="this.style.borderColor='var(--border)'"
            ondrop="handleFileDrop(event,'${name}')">
            <div style="font-size:2rem">📎</div>
            <p style="color:var(--text-secondary);margin:0;font-size:13px">Drag & drop or click to select</p>
            <p style="color:var(--text-muted);margin:0;font-size:11px">Supported: JPG, PNG, WEBP, PDF, DOC, DOCX (max 10MB)</p>
            <input type="file" id="file_${name}" accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style="display:none" onchange="handleFileSelect(event,'${name}')">
            <button type="button" class="btn btn-primary btn-sm" onclick="document.getElementById('file_${name}').click()">📁 Choose File</button>
        </div>
        <div id="upload_status_${name}" style="margin-top:8px;font-size:13px;color:var(--text-secondary)"></div>
        ${previewHtml}
    </div>`;
}

async function handleFileSelect(event, fieldName) {
    const file = event.target.files[0];
    if (file) await uploadCertFile(file, fieldName);
}

function handleFileDrop(event, fieldName) {
    event.preventDefault();
    document.getElementById('dropzone_' + fieldName).style.borderColor = 'var(--border)';
    const file = event.dataTransfer.files[0];
    if (file) uploadCertFile(file, fieldName);
}

async function uploadCertFile(file, fieldName) {
    const statusEl = document.getElementById('upload_status_' + fieldName);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (file.size > maxSize) { statusEl.innerHTML = '<span style="color:var(--danger)">❌ File too large (max 10MB)</span>'; return; }
    if (!allowed.includes(file.type)) { statusEl.innerHTML = '<span style="color:var(--danger)">❌ File type not allowed</span>'; return; }

    statusEl.innerHTML = '<span>⏳ Uploading...</span>';

    try {
        // Read as base64
        const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        const res = await fetch(`${API}/upload-cert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ file: base64, filename: file.name, mimeType: file.type })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Upload failed');

        // Set value in hidden field
        document.getElementById('f_' + fieldName).value = data.url;

        // Show preview
        const isDoc = data.mimeType === 'application/pdf' || data.mimeType.includes('word');
        const prevEl = statusEl.nextElementSibling;
        if (prevEl && prevEl.tagName !== 'DIV') prevEl.remove();

        statusEl.innerHTML = `<span style="color:var(--success)">✅ Uploaded: ${file.name}</span>`;

        // Inject preview
        const preview = document.createElement(isDoc ? 'a' : 'img');
        if (isDoc) {
            preview.href = data.url; preview.target = '_blank';
            preview.className = 'btn btn-ghost btn-sm';
            preview.style.marginTop = '8px';
            preview.textContent = '📄 View uploaded file';
        } else {
            preview.src = data.url;
            preview.style = 'max-width:200px;margin-top:8px;border-radius:8px;border:1px solid var(--border)';
            preview.alt = 'preview';
        }
        statusEl.after(preview);

    } catch (err) {
        statusEl.innerHTML = `<span style="color:var(--danger)">❌ ${err.message}</span>`;
    }
}

// ===========================
// Dashboard
// ===========================
async function loadDashboard() {
    const content = document.getElementById('content');
    content.innerHTML = '<p style="color:var(--text-muted)">Loading...</p>';
    try {
        const [info, exp, proj, svc, cert, skills] = await Promise.all([
            api('personal-info?type=all'), api('experience'),
            api('projects'), api('services'),
            api('certificates'), api('skills')
        ]);
        content.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card"><div class="value">${(exp || []).length}</div><div class="label">Experience</div></div>
            <div class="stat-card"><div class="value">${(proj || []).length}</div><div class="label">Projects</div></div>
            <div class="stat-card"><div class="value">${(svc || []).length}</div><div class="label">Services</div></div>
            <div class="stat-card"><div class="value">${(cert || []).length}</div><div class="label">Certificates</div></div>
            <div class="stat-card"><div class="value">${(skills || []).length}</div><div class="label">Skills</div></div>
        </div>
        <div class="card"><div class="card-header"><h2>Quick Access</h2></div><div class="card-body">
            <div style="display:flex;flex-wrap:wrap;gap:12px">
                ${sections.filter(s => s.id !== 'dashboard').map(s => `<button class="btn btn-ghost" onclick="loadSection('${s.id}')">${s.label}</button>`).join('')}
            </div>
        </div></div>
        <div class="card"><div class="card-header"><h2>ℹ️ Info</h2></div><div class="card-body">
            <p style="color:var(--text-secondary)">Semua perubahan langsung tampil di halaman utama portfolio secara real-time.</p>
            <p style="color:var(--text-secondary);margin-top:8px">🏆 <strong>Certificates</strong> → Muncul di section Achievements halaman utama.</p>
            <p style="color:var(--text-secondary);margin-top:4px">📋 <strong>Experience</strong> → Muncul di section Experience halaman utama.</p>
        </div></div>`;
    } catch (e) { content.innerHTML = `<div class="card"><div class="card-body"><p style="color:var(--danger)">Error: ${e.message}</p></div></div>`; }
}

// ===========================
// Personal Info
// ===========================
async function loadPersonal() {
    const content = document.getElementById('content');
    try {
        const data = await api('personal-info?type=all');
        const info = data.personalInfo || {};
        content.innerHTML = `
        <div class="card"><div class="card-header"><h2>Personal Information</h2><button class="btn btn-primary btn-sm" onclick="editPersonalInfo()">✏️ Edit</button></div>
            <div class="card-body">
                <div class="form-row"><div><strong>Name:</strong> ${info.name || '-'}</div><div><strong>Role:</strong> ${info.primary_role || '-'}</div></div>
                <p style="margin-top:12px;color:var(--text-secondary)">${info.tagline || ''}</p>
                <div class="form-row" style="margin-top:16px">
                    <div><strong>Email:</strong> ${info.email || '-'}</div>
                    <div><strong>Phone:</strong> ${info.phone || '-'}</div>
                </div>
                <div style="margin-top:8px"><strong>Location:</strong> ${info.location || '-'}</div>
                <div style="margin-top:8px"><strong>Status:</strong> <span class="tag tag-success">${info.status || '-'}</span></div>
            </div>
        </div>
        <div class="card"><div class="card-header"><h2>Statistics (Hero Counter)</h2><button class="btn btn-primary btn-sm" onclick="addStat()">+ Add</button></div>
            <div class="card-body"><div class="table-wrap"><table><thead><tr><th>Value</th><th>Suffix</th><th>Label</th><th>Actions</th></tr></thead>
            <tbody>${(data.statistics || []).map(s => `<tr><td>${s.value}</td><td>${s.suffix}</td><td>${s.label}</td><td class="actions"><button class="btn btn-ghost btn-sm" onclick='editStat(${JSON.stringify(s)})'>✏️</button><button class="btn btn-danger btn-sm" onclick="deleteStat(${s.id})">🗑️</button></td></tr>`).join('')}</tbody></table></div></div>
        </div>
        <div class="card"><div class="card-header"><h2>Social Links</h2><button class="btn btn-primary btn-sm" onclick="addSocial()">+ Add</button></div>
            <div class="card-body"><div class="table-wrap"><table><thead><tr><th>Platform</th><th>URL</th><th>Actions</th></tr></thead>
            <tbody>${(data.socialLinks || []).map(s => `<tr><td><span class="tag">${s.platform}</span></td><td style="max-width:300px;overflow:hidden;text-overflow:ellipsis">${s.url}</td><td class="actions"><button class="btn btn-ghost btn-sm" onclick='editSocial(${JSON.stringify(s)})'>✏️</button><button class="btn btn-danger btn-sm" onclick="deleteSocial(${s.id})">🗑️</button></td></tr>`).join('')}</tbody></table></div></div>
        </div>`;
    } catch (e) { content.innerHTML = `<p style="color:var(--danger)">${e.message}</p>`; }
}

async function editPersonalInfo() {
    const data = await api('personal-info');
    const roles = (data.roles || []).join(', ');
    const paragraphs = (data.about_paragraphs || []).join('\n\n');
    openModal('Edit Personal Info', `
        ${formField('Name', 'name', data.name)}
        ${formField('Roles (comma separated)', 'roles', roles)}
        ${formField('Primary Role', 'primary_role', data.primary_role)}
        ${formField('Tagline', 'tagline', data.tagline)}
        ${formField('Description', 'description', data.description, 'textarea')}
        <div class="form-row">
            ${formField('Email', 'email', data.email, 'email')}
            ${formField('Phone', 'phone', data.phone)}
        </div>
        <div class="form-row">
            ${formField('Location', 'location', data.location)}
            ${formField('Status', 'status', data.status)}
        </div>
        ${formField('CV URL (link Google Drive / file)', 'cv_url', data.cv_url)}
        ${formField('About Paragraphs (separate with blank line)', 'about_paragraphs', paragraphs, 'textarea')}
    `, `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePersonalInfo()">Save</button>`);
}

async function savePersonalInfo() {
    const body = {
        name: getField('name'), roles: getField('roles').split(',').map(s => s.trim()).filter(Boolean),
        primary_role: getField('primary_role'), tagline: getField('tagline'),
        description: getField('description'), email: getField('email'), phone: getField('phone'),
        location: getField('location'), status: getField('status'),
        cv_url: getField('cv_url'),
        about_paragraphs: getField('about_paragraphs').split('\n\n').filter(Boolean),
    };
    await api('personal-info', 'PUT', body);
    toast('Personal info updated!'); closeModal(); loadPersonal();
}

async function addStat() {
    openModal('Add Statistic', `${formField('Value', 'value', '', 'number')}${formField('Suffix', 'suffix', '+')}${formField('Label', 'label')}`,
        `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveStat()">Save</button>`);
}
async function editStat(s) {
    openModal('Edit Statistic', `<input type="hidden" id="f_id" value="${s.id}">${formField('Value', 'value', s.value, 'number')}${formField('Suffix', 'suffix', s.suffix)}${formField('Label', 'label', s.label)}`,
        `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveStat(true)">Save</button>`);
}
async function saveStat(isUpdate = false) {
    const body = { value: parseInt(getField('value')), suffix: getField('suffix'), label: getField('label') };
    if (isUpdate) { body.id = getField('id'); await api('personal-info?type=stats', 'PUT', body); }
    else { await api('personal-info?type=stats', 'POST', body); }
    toast('Saved!'); closeModal(); loadPersonal();
}
async function deleteStat(id) { if (!confirm('Delete?')) return; await api(`personal-info?type=stats&id=${id}`, 'DELETE'); toast('Deleted'); loadPersonal(); }

async function addSocial() {
    openModal('Add Social Link', `
        ${formField('Platform', 'platform', '', 'select', ['github','instagram','linkedin','tiktok','twitter','youtube','dribbble','behance'].map(p => `<option value="${p}">${p}</option>`).join(''))}
        ${formField('URL', 'url')}`,
        `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSocial()">Save</button>`);
}
async function editSocial(s) {
    openModal('Edit Social Link', `<input type="hidden" id="f_id" value="${s.id}">
        ${formField('Platform', 'platform', '', 'select', ['github','instagram','linkedin','tiktok','twitter','youtube','dribbble','behance'].map(p => `<option value="${p}" ${s.platform===p?'selected':''}>${p}</option>`).join(''))}
        ${formField('URL', 'url', s.url)}`,
        `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSocial(true)">Save</button>`);
}
async function saveSocial(isUpdate = false) {
    const body = { platform: getField('platform'), url: getField('url') };
    if (isUpdate) { body.id = getField('id'); await api('personal-info?type=social', 'PUT', body); }
    else { await api('personal-info?type=social', 'POST', body); }
    toast('Saved!'); closeModal(); loadPersonal();
}
async function deleteSocial(id) { if (!confirm('Delete?')) return; await api(`personal-info?type=social&id=${id}`, 'DELETE'); toast('Deleted'); loadPersonal(); }

// ===========================
// Generic CRUD Table Helper
// ===========================
function renderCrudTable(items, columns, editFn, deleteFn) {
    if (!items.length) return `<div class="empty-state"><div class="icon">📭</div><p>No data yet. Click + Add to start.</p></div>`;
    return `<div class="table-wrap"><table><thead><tr>${columns.map(c => `<th>${c.label}</th>`).join('')}<th>Actions</th></tr></thead>
    <tbody>${items.map(item => `<tr>${columns.map(c => `<td>${c.render ? c.render(item[c.key], item) : (item[c.key] ?? '-')}</td>`).join('')}
    <td class="actions"><button class="btn btn-ghost btn-sm" onclick='${editFn}(${JSON.stringify(item).replace(/'/g, "&#39;")})'>✏️</button><button class="btn btn-danger btn-sm" onclick="${deleteFn}(${item.id})">🗑️</button></td></tr>`).join('')}</tbody></table></div>`;
}

// ===========================
// Experience
// ===========================
async function loadExperience() {
    const items = await api('experience');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Experience & Education Timeline</h2><button class="btn btn-primary btn-sm" onclick="addExp()">+ Add</button></div>
        <div class="card-body">${renderCrudTable(items || [], [
            { key: 'year', label: 'Year' },
            { key: 'title', label: 'Title' },
            { key: 'type', label: 'Type', render: v => `<span class="tag ${v === 'education' ? 'tag-warning' : 'tag-success'}">${v}</span>` },
            { key: 'is_current', label: 'Current', render: v => v ? '✅' : '' }
        ], 'editExp', 'deleteExp')}</div>
    </div>`;
}

function expForm(s = {}) {
    const achs = (s.achievements || []).join('\n');
    const techs = (s.technologies || []).join(', ');
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    <div class="form-row">${formField('Year', 'year', s.year, 'text', 'placeholder="2023 - Present"')}${formField('Type', 'type', '', 'select', ['education','work','project'].map(t => `<option value="${t}" ${s.type===t?'selected':''}>${t}</option>`).join(''))}</div>
    ${formField('Title / Position', 'title', s.title)}
    ${formField('Description', 'description', s.description, 'textarea')}
    ${formField('Achievements (one per line)', 'achievements', achs, 'textarea')}
    ${formField('Technologies (comma separated)', 'technologies', techs)}
    ${formField('Mark as Current', 'is_current', s.is_current, 'checkbox')}`;
}
function addExp() { openModal('Add Experience', expForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveExp()">Save</button>`); }
function editExp(s) { openModal('Edit Experience', expForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveExp(true)">Save</button>`); }
async function saveExp(u = false) {
    const body = {
        year: getField('year'), title: getField('title'), type: getField('type'),
        description: getField('description'),
        achievements: getField('achievements').split('\n').map(s => s.trim()).filter(Boolean),
        technologies: getField('technologies').split(',').map(s => s.trim()).filter(Boolean),
        is_current: getField('is_current')
    };
    if (u) { body.id = getField('id'); await api('experience', 'PUT', body); } else { await api('experience', 'POST', body); }
    toast('Saved! ✅ Changes live on main page.'); closeModal(); loadExperience();
}
async function deleteExp(id) { if (!confirm('Delete this experience?')) return; await api(`experience?id=${id}`, 'DELETE'); toast('Deleted'); loadExperience(); }

// ===========================
// Projects
// ===========================
async function loadProjects() {
    const items = await api('projects');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Projects</h2><button class="btn btn-primary btn-sm" onclick="addProject()">+ Add</button></div>
        <div class="card-body">${renderCrudTable(items || [], [
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category', render: v => `<span class="tag">${v}</span>` },
            { key: 'year', label: 'Year' },
            { key: 'featured', label: '⭐', render: v => v ? '⭐' : '' }
        ], 'editProject', 'deleteProject')}</div>
    </div>`;
}

function projectForm(s = {}) {
    const techs = (s.technologies || []).join(', ');
    const tags = (s.tags || []).join(', ');
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    ${formField('Title', 'title', s.title)}
    <div class="form-row">
        ${formField('Category', 'category', '', 'select', ['web','ui','mobile','other'].map(c => `<option value="${c}" ${s.category===c?'selected':''}>${c}</option>`).join(''))}
        ${formField('Year', 'year', s.year)}
    </div>
    ${formField('Short Description', 'description', s.description, 'textarea')}
    ${formField('Full Description', 'full_description', s.full_description || s.fullDescription, 'textarea')}
    ${certFileUploadField('Project Image', 'image', s.image)}
    ${formField('Technologies (comma separated)', 'technologies', techs)}
    ${formField('Tags (comma separated)', 'tags', tags)}
    <div class="form-row">
        ${formField('Live URL', 'live_url', s.live_url || s.liveUrl)}
        ${formField('GitHub URL', 'github_url', s.github_url || s.githubUrl)}
    </div>
    <div class="form-row">
        ${formField('Client', 'client', s.client)}
        ${formField('Duration', 'duration', s.duration)}
    </div>
    ${formField('Featured Project', 'featured', s.featured, 'checkbox')}`;
}
function addProject() { openModal('Add Project', projectForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProject()">Save</button>`); }
function editProject(s) { openModal('Edit Project', projectForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProject(true)">Save</button>`); }
async function saveProject(u = false) {
    const body = {
        title: getField('title'), category: getField('category'), year: getField('year'),
        description: getField('description'), full_description: getField('full_description'),
        image: getField('image'),
        technologies: getField('technologies').split(',').map(s => s.trim()).filter(Boolean),
        tags: getField('tags').split(',').map(s => s.trim()).filter(Boolean),
        live_url: getField('live_url'), github_url: getField('github_url'),
        client: getField('client'), duration: getField('duration'), featured: getField('featured')
    };
    if (u) { body.id = getField('id'); await api('projects', 'PUT', body); } else { await api('projects', 'POST', body); }
    toast('Saved! ✅ Changes live on main page.'); closeModal(); loadProjects();
}
async function deleteProject(id) { if (!confirm('Delete this project?')) return; await api(`projects?id=${id}`, 'DELETE'); toast('Deleted'); loadProjects(); }

// ===========================
// Services
// ===========================
async function loadServices() {
    const items = await api('services');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Services</h2><button class="btn btn-primary btn-sm" onclick="addService()">+ Add</button></div>
        <div class="card-body">${renderCrudTable(items || [], [
            { key: 'number', label: '#' },
            { key: 'title', label: 'Title' },
            { key: 'pricing', label: 'Pricing' },
            { key: 'delivery_time', label: 'Delivery' }
        ], 'editService', 'deleteService')}</div>
    </div>`;
}
function serviceForm(s = {}) {
    const feats = (s.features || []).join('\n');
    const techs = (s.technologies || []).join(', ');
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    ${formField('Title', 'title', s.title)}
    ${formField('Description', 'description', s.description, 'textarea')}
    ${formField('Features (one per line)', 'features', feats, 'textarea')}
    ${formField('Technologies (comma separated)', 'technologies', techs)}
    <div class="form-row">
        ${formField('Pricing', 'pricing', s.pricing || 'Custom Quote')}
        ${formField('Delivery Time', 'delivery_time', s.delivery_time)}
    </div>`;
}
function addService() { openModal('Add Service', serviceForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveService()">Save</button>`); }
function editService(s) { openModal('Edit Service', serviceForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveService(true)">Save</button>`); }
async function saveService(u = false) {
    const body = {
        title: getField('title'), description: getField('description'),
        features: getField('features').split('\n').filter(Boolean),
        technologies: getField('technologies').split(',').map(s => s.trim()).filter(Boolean),
        pricing: getField('pricing'), delivery_time: getField('delivery_time')
    };
    if (u) { body.id = getField('id'); await api('services', 'PUT', body); } else { await api('services', 'POST', body); }
    toast('Saved!'); closeModal(); loadServices();
}
async function deleteService(id) { if (!confirm('Delete?')) return; await api(`services?id=${id}`, 'DELETE'); toast('Deleted'); loadServices(); }

// ===========================
// Certificates (sync → Achievements section)
// ===========================
async function loadCertificates() {
    const items = await api('certificates');
    document.getElementById('content').innerHTML = `
    <div class="card">
        <div class="card-header">
            <h2>🏆 Certificates & Awards</h2>
            <button class="btn btn-primary btn-sm" onclick="addCert()">+ Add Certificate</button>
        </div>
        <div style="padding:12px 24px;background:var(--surface-2,#1a1a2e);border-bottom:1px solid var(--border)">
            <p style="color:var(--text-secondary);font-size:13px;margin:0">
                ✅ Certificates yang kamu tambahkan di sini langsung muncul di section <strong>Achievements</strong> halaman utama portfolio.
                Upload file gambar (JPG/PNG/WEBP), PDF, atau Word untuk ditampilkan.
            </p>
        </div>
        <div class="card-body">
            ${items && items.length ? `
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-bottom:16px">
                ${items.map(c => `
                <div style="border:1px solid var(--border);border-radius:12px;overflow:hidden;background:var(--surface-2,#1a1a2e)">
                    ${c.image ? (c.image.includes('.pdf') || c.image.includes('.doc')
                        ? `<div style="padding:20px;text-align:center;background:var(--surface-3,#16213e)"><div style="font-size:3rem">📄</div><p style="color:var(--text-secondary);font-size:12px;margin:4px 0">${c.image.split('/').pop().split('_').slice(1).join('_')}</p></div>`
                        : `<img src="${c.image}" style="width:100%;aspect-ratio:16/9;object-fit:cover" alt="${c.title}">`
                    ) : `<div style="padding:20px;text-align:center;background:var(--surface-3,#16213e)"><div style="font-size:3rem">🏆</div></div>`}
                    <div style="padding:12px">
                        <h4 style="margin:0 0 4px;font-size:14px;color:var(--text)">${c.title}</h4>
                        <p style="margin:0;font-size:12px;color:var(--text-secondary)">${c.issuer || ''} ${c.date ? '· ' + c.date : ''}</p>
                        <span class="tag" style="margin-top:6px;display:inline-block">${c.category || 'certification'}</span>
                        <div style="display:flex;gap:8px;margin-top:12px">
                            <button class="btn btn-ghost btn-sm" onclick='editCert(${JSON.stringify(c).replace(/'/g, "&#39;")})'>✏️ Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteCert(${c.id})">🗑️ Delete</button>
                            ${c.image ? `<a href="${c.image}" target="_blank" class="btn btn-ghost btn-sm">👁️ View</a>` : ''}
                        </div>
                    </div>
                </div>`).join('')}
            </div>` : `<div class="empty-state"><div class="icon">🏆</div><p>No certificates yet. Click + Add Certificate to start.</p></div>`}
        </div>
    </div>`;
}

function certForm(s = {}) {
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    ${formField('Certificate Title *', 'title', s.title)}
    <div class="form-row">
        ${formField('Issuer / Organization', 'issuer', s.issuer)}
        ${formField('Date (e.g. Jan 2024)', 'date', s.date)}
    </div>
    ${formField('Category', 'category', '', 'select',
        ['certification','award','achievement','course','bootcamp','workshop'].map(c =>
            `<option value="${c}" ${(s.category||'certification')===c?'selected':''}>${c.charAt(0).toUpperCase()+c.slice(1)}</option>`
        ).join('')
    )}
    ${formField('Credential URL (optional link to verify)', 'credential_url', s.credential_url || '')}
    ${certFileUploadField('Upload File (gambar/PDF/Word)', 'image', s.image || '')}
    <p style="font-size:12px;color:var(--text-muted);margin-top:-8px">* File akan tersimpan di Supabase Storage dan muncul di halaman utama</p>`;
}

function addCert() {
    openModal('Add Certificate',
        certForm(),
        `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveCert()">💾 Save & Publish</button>`
    );
}
function editCert(s) {
    openModal('Edit Certificate',
        certForm(s),
        `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveCert(true)">💾 Save & Publish</button>`
    );
}
async function saveCert(u = false) {
    const title = getField('title');
    if (!title.trim()) { toast('Title is required', 'error'); return; }
    const body = {
        title, issuer: getField('issuer'), date: getField('date'),
        credential_url: getField('credential_url'),
        image: getField('image'),
        category: getField('category')
    };
    try {
        if (u) { body.id = getField('id'); await api('certificates', 'PUT', body); }
        else { await api('certificates', 'POST', body); }
        toast('✅ Saved! Certificate now visible on main page.'); closeModal(); loadCertificates();
    } catch (e) { toast(e.message, 'error'); }
}
async function deleteCert(id) {
    if (!confirm('Delete this certificate? It will be removed from the main page too.')) return;
    await api(`certificates?id=${id}`, 'DELETE');
    toast('Deleted'); loadCertificates();
}

// ===========================
// Skills
// ===========================
async function loadSkills() {
    const skills = await api('skills');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Skills</h2><button class="btn btn-primary btn-sm" onclick="addSkill()">+ Add Skill</button></div>
        <div class="card-body">${renderCrudTable(skills || [], [
            { key: 'name', label: 'Skill' },
            { key: 'level', label: 'Level', render: v => `<div style="display:flex;align-items:center;gap:8px"><div style="flex:1;height:6px;background:var(--border);border-radius:3px"><div style="width:${v}%;height:100%;background:var(--accent);border-radius:3px"></div></div>${v}%</div>` },
            { key: 'category', label: 'Category', render: v => `<span class="tag">${v}</span>` }
        ], 'editSkill', 'deleteSkill')}</div>
    </div>`;
}
function skillForm(s = {}) {
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    ${formField('Skill Name', 'name', s.name)}
    ${formField('Level (0-100)', 'level', s.level || 50, 'number')}
    ${formField('Category', 'category', '', 'select', ['frontend','backend','design','tools','cloud'].map(c => `<option value="${c}" ${s.category===c?'selected':''}>${c}</option>`).join(''))}`;
}
function addSkill() { openModal('Add Skill', skillForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSkill()">Save</button>`); }
function editSkill(s) { openModal('Edit Skill', skillForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSkill(true)">Save</button>`); }
async function saveSkill(isUpdate = false) {
    const body = { name: getField('name'), level: parseInt(getField('level')), category: getField('category') };
    if (isUpdate) { body.id = getField('id'); await api('skills', 'PUT', body); } else { await api('skills', 'POST', body); }
    toast('Saved!'); closeModal(); loadSkills();
}
async function deleteSkill(id) { if (!confirm('Delete?')) return; await api(`skills?id=${id}`, 'DELETE'); toast('Deleted'); loadSkills(); }

// ===========================
// Messages (Contact)
// ===========================
async function loadMessages() {
    try {
        const items = await api('contact');
        document.getElementById('content').innerHTML = `
        <div class="card"><div class="card-header"><h2>📬 Contact Messages</h2><span style="color:var(--text-secondary);font-size:13px">${(items||[]).length} messages</span></div>
            <div class="card-body">${(items && items.length) ? `<div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead>
            <tbody>${items.map(m => `<tr>
                <td><strong>${m.name}</strong></td>
                <td><a href="mailto:${m.email}" style="color:var(--accent)">${m.email}</a></td>
                <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${m.message || '-'}</td>
                <td style="white-space:nowrap;font-size:12px">${m.created_at ? new Date(m.created_at).toLocaleDateString('id-ID', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '-'}</td>
            </tr>`).join('')}</tbody></table></div>`
            : `<div class="empty-state"><div class="icon">📭</div><p>No messages yet</p></div>`}</div>
        </div>`;
    } catch (e) {
        document.getElementById('content').innerHTML = `<div class="card"><div class="card-body"><p style="color:var(--danger)">${e.message}</p></div></div>`;
    }
}

// ===========================
// Init
// ===========================
document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
checkAuth();
