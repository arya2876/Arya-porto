/**
 * Admin Panel JavaScript
 * Portfolio CMS - Vercel + Supabase Edition
 */
const API = '/api';
let currentSection = 'dashboard';
let authToken = localStorage.getItem('adminToken') || null;

// ===========================
// Menu Configuration
// ===========================
const sections = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'personal', label: '👤 Personal Info', icon: '👤' },
    { id: 'skills', label: '⚡ Skills', icon: '⚡' },
    { id: 'experience', label: '📋 Experience', icon: '📋' },
    { id: 'projects', label: '🎨 Projects', icon: '🎨' },
    { id: 'services', label: '🛠️ Services', icon: '🛠️' },
    { id: 'testimonials', label: '💬 Testimonials', icon: '💬' },
    { id: 'certificates', label: '🏆 Certificates', icon: '🏆' },
    { id: 'working-process', label: '⚙️ Working Process', icon: '⚙️' },
];

// ===========================
// Auth (JWT)
// ===========================
async function doLogin() {
    const u = document.getElementById('loginUser').value;
    const p = document.getElementById('loginPass').value;
    try {
        const r = await fetch(`${API}/auth?action=login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        });
        const d = await r.json();
        if (d.success) {
            authToken = d.token;
            localStorage.setItem('adminToken', authToken);
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('appPage').classList.remove('hidden');
            document.getElementById('adminName').textContent = d.user.name || d.user.username;
            buildNav(); loadSection('dashboard');
        } else { showLoginError(d.error || 'Login failed'); }
    } catch (e) { showLoginError('Cannot connect to server'); }
}

function showLoginError(msg) {
    const el = document.getElementById('loginError');
    el.textContent = msg; el.classList.remove('hidden');
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
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('appPage').classList.remove('hidden');
            document.getElementById('adminName').textContent = d.user.name || d.user.username;
            buildNav(); loadSection('dashboard');
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
    document.getElementById('pageTitle').textContent = sections.find(s => s.id === id)?.label.substring(2) || id;
    buildNav();
    const loaders = {
        dashboard: loadDashboard, personal: loadPersonal, skills: loadSkills,
        experience: loadExperience, projects: loadProjects, services: loadServices,
        testimonials: loadTestimonials, certificates: loadCertificates,
        'working-process': loadWorkingProcess
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
    return r.json();
}

function toast(msg, type = 'success') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3000);
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
// Cloudinary Upload
// ===========================
function openCloudinaryUpload(targetFieldId) {
    if (typeof cloudinary === 'undefined') {
        toast('Cloudinary widget not loaded', 'error');
        return;
    }
    const widget = cloudinary.createUploadWidget({
        cloudName: 'YOUR_CLOUD_NAME',  // Will be replaced by user
        uploadPreset: 'portfolio_unsigned',
        folder: 'portfolio',
        maxFiles: 1,
        cropping: false,
        sources: ['local', 'url', 'camera'],
        resourceType: 'image',
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
        maxFileSize: 5000000,
    }, (error, result) => {
        if (!error && result && result.event === 'success') {
            document.getElementById(targetFieldId).value = result.info.secure_url;
            toast('Image uploaded!');
        }
    });
    widget.open();
}

function imageUploadField(label, name, value = '') {
    return `<div class="form-group">
        <label>${label}</label>
        <div style="display:flex;gap:8px">
            <input type="text" class="form-control" id="f_${name}" value="${value || ''}" placeholder="Image URL" style="flex:1">
            <button type="button" class="btn btn-primary btn-sm" onclick="openCloudinaryUpload('f_${name}')">📷 Upload</button>
        </div>
        ${value ? `<img src="${value}" style="max-width:200px;margin-top:8px;border-radius:8px;border:1px solid var(--border)" alt="preview">` : ''}
    </div>`;
}

// ===========================
// Dashboard
// ===========================
async function loadDashboard() {
    const content = document.getElementById('content');
    content.innerHTML = '<p style="color:var(--text-muted)">Loading...</p>';
    try {
        const [info, skills, exp, proj, svc, test, cert] = await Promise.all([
            api('personal-info?type=all'), api('skills'), api('experience'),
            api('projects'), api('services'), api('testimonials'), api('certificates')
        ]);
        content.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card"><div class="value">${(skills || []).length || 0}</div><div class="label">Skills</div></div>
        <div class="stat-card"><div class="value">${(exp || []).length || 0}</div><div class="label">Experience</div></div>
        <div class="stat-card"><div class="value">${(proj || []).length || 0}</div><div class="label">Projects</div></div>
        <div class="stat-card"><div class="value">${(svc || []).length || 0}</div><div class="label">Services</div></div>
        <div class="stat-card"><div class="value">${(test || []).length || 0}</div><div class="label">Testimonials</div></div>
        <div class="stat-card"><div class="value">${(cert || []).length || 0}</div><div class="label">Certificates</div></div>
      </div>
      <div class="card"><div class="card-header"><h2>Quick Actions</h2></div><div class="card-body">
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          ${sections.filter(s => s.id !== 'dashboard').map(s => `<button class="btn btn-ghost" onclick="loadSection('${s.id}')">${s.label}</button>`).join('')}
        </div>
      </div></div>`;
    } catch (e) { content.innerHTML = '<p style="color:var(--danger)">Error loading dashboard. Make sure database is seeded.</p>'; }
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
          <p style="margin-top:8px">${info.description || ''}</p>
          <div class="form-row" style="margin-top:16px"><div><strong>Email:</strong> ${info.email || '-'}</div><div><strong>Phone:</strong> ${info.phone || '-'}</div></div>
          <div style="margin-top:8px"><strong>Location:</strong> ${info.location || '-'}</div>
        </div></div>
      <div class="card"><div class="card-header"><h2>Statistics</h2><button class="btn btn-primary btn-sm" onclick="addStat()">+ Add</button></div>
        <div class="card-body"><div class="table-wrap"><table><thead><tr><th>Value</th><th>Suffix</th><th>Label</th><th>Actions</th></tr></thead>
        <tbody>${(data.statistics || []).map(s => `<tr><td>${s.value}</td><td>${s.suffix}</td><td>${s.label}</td><td class="actions"><button class="btn btn-ghost btn-sm" onclick='editStat(${JSON.stringify(s)})'>✏️</button><button class="btn btn-danger btn-sm" onclick="deleteStat(${s.id})">🗑️</button></td></tr>`).join('')}</tbody></table></div></div></div>
      <div class="card"><div class="card-header"><h2>Social Links</h2><button class="btn btn-primary btn-sm" onclick="addSocial()">+ Add</button></div>
        <div class="card-body"><div class="table-wrap"><table><thead><tr><th>Platform</th><th>URL</th><th>Actions</th></tr></thead>
        <tbody>${(data.socialLinks || []).map(s => `<tr><td><span class="tag">${s.platform}</span></td><td style="max-width:300px;overflow:hidden;text-overflow:ellipsis">${s.url}</td><td class="actions"><button class="btn btn-ghost btn-sm" onclick='editSocial(${JSON.stringify(s)})'>✏️</button><button class="btn btn-danger btn-sm" onclick="deleteSocial(${s.id})">🗑️</button></td></tr>`).join('')}</tbody></table></div></div></div>`;
    } catch (e) { content.innerHTML = '<p style="color:var(--danger)">Error loading data</p>'; }
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
    ${formField('Location', 'location', data.location)}
    ${formField('Status', 'status', data.status)}
    ${formField('About Paragraphs (separate with blank line)', 'about_paragraphs', paragraphs, 'textarea')}
  `, `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePersonalInfo()">Save</button>`);
}

async function savePersonalInfo() {
    const body = {
        name: getField('name'), roles: getField('roles').split(',').map(s => s.trim()),
        primary_role: getField('primary_role'), tagline: getField('tagline'),
        description: getField('description'), email: getField('email'), phone: getField('phone'),
        location: getField('location'), status: getField('status'),
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
    openModal('Add Social Link', `${formField('Platform', 'platform')}${formField('URL', 'url')}`,
        `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSocial()">Save</button>`);
}
async function editSocial(s) {
    openModal('Edit Social Link', `<input type="hidden" id="f_id" value="${s.id}">${formField('Platform', 'platform', s.platform)}${formField('URL', 'url', s.url)}`,
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
// Generic CRUD Helpers
// ===========================
function renderCrudTable(items, columns, editFn, deleteFn) {
    if (!items.length) return `<div class="empty-state"><div class="icon">📭</div><p>No data yet</p></div>`;
    return `<div class="table-wrap"><table><thead><tr>${columns.map(c => `<th>${c.label}</th>`).join('')}<th>Actions</th></tr></thead>
    <tbody>${items.map(item => `<tr>${columns.map(c => `<td>${c.render ? c.render(item[c.key], item) : (item[c.key] || '-')}</td>`).join('')}
    <td class="actions"><button class="btn btn-ghost btn-sm" onclick='${editFn}(${JSON.stringify(item).replace(/'/g, "&#39;")})'>✏️</button><button class="btn btn-danger btn-sm" onclick="${deleteFn}(${item.id})">🗑️</button></td></tr>`).join('')}</tbody></table></div>`;
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
    ], 'editSkill', 'deleteSkill')}</div></div>`;
}

function skillForm(s = {}) {
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    ${formField('Skill Name', 'name', s.name)}
    ${formField('Level (0-100)', 'level', s.level || 50, 'number')}
    ${formField('Category', 'category', '', 'select', ['frontend', 'backend', 'design', 'tools'].map(c => `<option value="${c}" ${s.category === c ? 'selected' : ''}>${c}</option>`).join(''))}`;
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
// Experience
// ===========================
async function loadExperience() {
    const items = await api('experience');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Experience Timeline</h2><button class="btn btn-primary btn-sm" onclick="addExp()">+ Add</button></div>
      <div class="card-body">${renderCrudTable(items || [], [
        { key: 'year', label: 'Year' },
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type', render: v => `<span class="tag ${v === 'education' ? 'tag-warning' : 'tag-success'}">${v}</span>` },
        { key: 'is_current', label: 'Current', render: v => v ? '✅' : '' }
    ], 'editExp', 'deleteExp')}</div></div>`;
}

function expForm(s = {}) {
    const achs = (s.achievements || []).join('\n');
    const techs = (s.technologies || []).join(', ');
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    ${formField('Year', 'year', s.year)}${formField('Title', 'title', s.title)}
    ${formField('Type', 'type', '', 'select', ['education', 'work', 'project'].map(t => `<option value="${t}" ${s.type === t ? 'selected' : ''}>${t}</option>`).join(''))}
    ${formField('Description', 'description', s.description, 'textarea')}
    ${formField('Achievements (one per line)', 'achievements', achs, 'textarea')}
    ${formField('Technologies (comma separated)', 'technologies', techs)}
    ${formField('Current', 'is_current', s.is_current, 'checkbox')}`;
}
function addExp() { openModal('Add Experience', expForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveExp()">Save</button>`); }
function editExp(s) { openModal('Edit Experience', expForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveExp(true)">Save</button>`); }
async function saveExp(u = false) {
    const body = {
        year: getField('year'), title: getField('title'), type: getField('type'),
        description: getField('description'), achievements: getField('achievements').split('\n').filter(Boolean),
        technologies: getField('technologies').split(',').map(s => s.trim()).filter(Boolean), is_current: getField('is_current')
    };
    if (u) { body.id = getField('id'); await api('experience', 'PUT', body); } else { await api('experience', 'POST', body); }
    toast('Saved!'); closeModal(); loadExperience();
}
async function deleteExp(id) { if (!confirm('Delete?')) return; await api(`experience?id=${id}`, 'DELETE'); toast('Deleted'); loadExperience(); }

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
        { key: 'featured', label: 'Featured', render: v => v ? '⭐' : '' }
    ], 'editProject', 'deleteProject')}</div></div>`;
}

function projectForm(s = {}) {
    const techs = (s.technologies || []).join(', ');
    const tags = (s.tags || []).join(', ');
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    ${formField('Title', 'title', s.title)}
    <div class="form-row">${formField('Category', 'category', s.category)}${formField('Year', 'year', s.year)}</div>
    ${formField('Short Description', 'description', s.description, 'textarea')}
    ${formField('Full Description', 'full_description', s.full_description || s.fullDescription, 'textarea')}
    ${imageUploadField('Project Image', 'image', s.image)}
    ${formField('Technologies (comma separated)', 'technologies', techs)}
    ${formField('Tags (comma separated)', 'tags', tags)}
    <div class="form-row">${formField('Live URL', 'live_url', s.live_url || s.liveUrl)}${formField('GitHub URL', 'github_url', s.github_url || s.githubUrl)}</div>
    <div class="form-row">${formField('Client', 'client', s.client)}${formField('Duration', 'duration', s.duration)}</div>
    ${formField('Featured', 'featured', s.featured, 'checkbox')}`;
}
function addProject() { openModal('Add Project', projectForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProject()">Save</button>`); }
function editProject(s) { openModal('Edit Project', projectForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProject(true)">Save</button>`); }
async function saveProject(u = false) {
    const body = {
        title: getField('title'), category: getField('category'), year: getField('year'),
        description: getField('description'), full_description: getField('full_description'),
        image: getField('image'), technologies: getField('technologies').split(',').map(s => s.trim()).filter(Boolean),
        tags: getField('tags').split(',').map(s => s.trim()).filter(Boolean),
        live_url: getField('live_url'), github_url: getField('github_url'),
        client: getField('client'), duration: getField('duration'), featured: getField('featured')
    };
    if (u) { body.id = getField('id'); await api('projects', 'PUT', body); } else { await api('projects', 'POST', body); }
    toast('Saved!'); closeModal(); loadProjects();
}
async function deleteProject(id) { if (!confirm('Delete?')) return; await api(`projects?id=${id}`, 'DELETE'); toast('Deleted'); loadProjects(); }

// ===========================
// Services
// ===========================
async function loadServices() {
    const items = await api('services');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Services</h2><button class="btn btn-primary btn-sm" onclick="addService()">+ Add</button></div>
      <div class="card-body">${renderCrudTable(items || [], [
        { key: 'number', label: '#' }, { key: 'title', label: 'Title' },
        { key: 'pricing', label: 'Pricing' }
    ], 'editService', 'deleteService')}</div></div>`;
}

function serviceForm(s = {}) {
    const feats = (s.features || []).join('\n');
    const techs = (s.technologies || []).join(', ');
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    <div class="form-row">${formField('Number', 'number', s.number || '01')}${formField('Icon (React Icon name)', 'icon', s.icon || 'FaCode')}</div>
    ${formField('Title', 'title', s.title)}${formField('Description', 'description', s.description, 'textarea')}
    ${formField('Features (one per line)', 'features', feats, 'textarea')}
    ${formField('Technologies (comma separated)', 'technologies', techs)}
    <div class="form-row">${formField('Pricing', 'pricing', s.pricing || 'Custom Quote')}${formField('Delivery Time', 'delivery_time', s.delivery_time)}</div>`;
}
function addService() { openModal('Add Service', serviceForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveService()">Save</button>`); }
function editService(s) { openModal('Edit Service', serviceForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveService(true)">Save</button>`); }
async function saveService(u = false) {
    const body = {
        number: getField('number'), icon: getField('icon'), title: getField('title'),
        description: getField('description'), features: getField('features').split('\n').filter(Boolean),
        technologies: getField('technologies').split(',').map(s => s.trim()).filter(Boolean),
        pricing: getField('pricing'), delivery_time: getField('delivery_time')
    };
    if (u) { body.id = getField('id'); await api('services', 'PUT', body); } else { await api('services', 'POST', body); }
    toast('Saved!'); closeModal(); loadServices();
}
async function deleteService(id) { if (!confirm('Delete?')) return; await api(`services?id=${id}`, 'DELETE'); toast('Deleted'); loadServices(); }

// ===========================
// Testimonials
// ===========================
async function loadTestimonials() {
    const items = await api('testimonials');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Testimonials</h2><button class="btn btn-primary btn-sm" onclick="addTesti()">+ Add</button></div>
      <div class="card-body">${renderCrudTable(items || [], [
        { key: 'name', label: 'Name' }, { key: 'company', label: 'Company' },
        { key: 'rating', label: 'Rating', render: v => '⭐'.repeat(v) }
    ], 'editTesti', 'deleteTesti')}</div></div>`;
}

function testiForm(s = {}) {
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    <div class="form-row">${formField('Name', 'name', s.name)}${formField('Role', 'role', s.role)}</div>
    <div class="form-row">${formField('Company', 'company', s.company)}${formField('Avatar URL', 'avatar', s.avatar)}</div>
    ${formField('Rating (1-5)', 'rating', s.rating || 5, 'number')}
    ${formField('Testimonial Text', 'text', s.text, 'textarea')}
    ${formField('Project', 'project', s.project)}`;
}
function addTesti() { openModal('Add Testimonial', testiForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveTesti()">Save</button>`); }
function editTesti(s) { openModal('Edit Testimonial', testiForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveTesti(true)">Save</button>`); }
async function saveTesti(u = false) {
    const body = {
        name: getField('name'), role: getField('role'), company: getField('company'),
        avatar: getField('avatar'), rating: parseInt(getField('rating')), text: getField('text'),
        project: getField('project')
    };
    if (u) { body.id = getField('id'); await api('testimonials', 'PUT', body); } else { await api('testimonials', 'POST', body); }
    toast('Saved!'); closeModal(); loadTestimonials();
}
async function deleteTesti(id) { if (!confirm('Delete?')) return; await api(`testimonials?id=${id}`, 'DELETE'); toast('Deleted'); loadTestimonials(); }

// ===========================
// Certificates
// ===========================
async function loadCertificates() {
    const items = await api('certificates');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Certificates & Awards</h2><button class="btn btn-primary btn-sm" onclick="addCert()">+ Add</button></div>
      <div class="card-body">${renderCrudTable(items || [], [
        { key: 'title', label: 'Title' }, { key: 'issuer', label: 'Issuer' },
        { key: 'date', label: 'Date' },
        { key: 'category', label: 'Category', render: v => `<span class="tag">${v}</span>` }
    ], 'editCert', 'deleteCert')}</div></div>`;
}

function certForm(s = {}) {
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    ${formField('Title', 'title', s.title)}${formField('Issuer', 'issuer', s.issuer)}
    <div class="form-row">${formField('Date', 'date', s.date)}${formField('Credential ID', 'credential_id', s.credential_id)}</div>
    ${formField('Credential URL', 'credential_url', s.credential_url)}
    ${imageUploadField('Certificate Image', 'image', s.image)}
    ${formField('Category', 'category', '', 'select', ['certification', 'award', 'achievement', 'course'].map(c => `<option value="${c}" ${(s.category || 'certification') === c ? 'selected' : ''}>${c}</option>`).join(''))}`;
}
function addCert() { openModal('Add Certificate', certForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveCert()">Save</button>`); }
function editCert(s) { openModal('Edit Certificate', certForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveCert(true)">Save</button>`); }
async function saveCert(u = false) {
    const body = {
        title: getField('title'), issuer: getField('issuer'), date: getField('date'),
        credential_id: getField('credential_id'), credential_url: getField('credential_url'),
        image: getField('image'), category: getField('category')
    };
    if (u) { body.id = getField('id'); await api('certificates', 'PUT', body); } else { await api('certificates', 'POST', body); }
    toast('Saved!'); closeModal(); loadCertificates();
}
async function deleteCert(id) { if (!confirm('Delete?')) return; await api(`certificates?id=${id}`, 'DELETE'); toast('Deleted'); loadCertificates(); }

// ===========================
// Working Process
// ===========================
async function loadWorkingProcess() {
    const items = await api('working-process');
    document.getElementById('content').innerHTML = `
    <div class="card"><div class="card-header"><h2>Working Process</h2><button class="btn btn-primary btn-sm" onclick="addWP()">+ Add</button></div>
      <div class="card-body">${renderCrudTable(items || [], [
        { key: 'number', label: '#' }, { key: 'title', label: 'Title' }, { key: 'icon', label: 'Icon' }
    ], 'editWP', 'deleteWP')}</div></div>`;
}

function wpForm(s = {}) {
    const feats = (s.features || []).join('\n');
    return `${s.id ? `<input type="hidden" id="f_id" value="${s.id}">` : ''}
    <div class="form-row">${formField('Number', 'number', s.number || '01')}${formField('Icon', 'icon', s.icon || 'FaCode')}</div>
    ${formField('Title', 'title', s.title)}${formField('Description', 'description', s.description, 'textarea')}
    ${formField('Features (one per line)', 'features', feats, 'textarea')}`;
}
function addWP() { openModal('Add Process', wpForm(), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveWP()">Save</button>`); }
function editWP(s) { openModal('Edit Process', wpForm(s), `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveWP(true)">Save</button>`); }
async function saveWP(u = false) {
    const body = {
        number: getField('number'), icon: getField('icon'), title: getField('title'),
        description: getField('description'), features: getField('features').split('\n').filter(Boolean)
    };
    if (u) { body.id = getField('id'); await api('working-process', 'PUT', body); } else { await api('working-process', 'POST', body); }
    toast('Saved!'); closeModal(); loadWorkingProcess();
}
async function deleteWP(id) { if (!confirm('Delete?')) return; await api(`working-process?id=${id}`, 'DELETE'); toast('Deleted'); loadWorkingProcess(); }

// ===========================
// Init
// ===========================
document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
checkAuth();
