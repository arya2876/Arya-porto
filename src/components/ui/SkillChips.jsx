import PropTypes from 'prop-types';

/**
 * SkillChips - grup tech-stack sebagai badge/chip TANPA angka persentase.
 * Persentase skill ("React 90%") tidak bermakna dan menyesatkan; chip per
 * kategori lebih jujur dan mudah dipindai.
 */
const SkillChips = ({ groups }) => (
  <div className="space-y-6">
    {groups.map((group) => (
      <div key={group.title}>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-light-text-secondary dark:text-dark-text-secondary">
          {group.title}
        </h4>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full text-sm font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 hover:border-primary-500/50 hover:bg-primary-500/20 transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

SkillChips.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default SkillChips;
