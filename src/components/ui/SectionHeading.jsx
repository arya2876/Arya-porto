import PropTypes from 'prop-types';

/**
 * SectionHeading - numbered kicker (racing style: "04 — PORTFOLIO").
 * `num` selalu diambil dari navNum() di src/data/navigation.js supaya
 * penomoran menu overlay dan heading section tidak pernah lepas sinkron.
 */
const SectionHeading = ({ num, title, className = '' }) => (
  <div className={`flex items-center justify-center gap-3 mb-4 ${className}`}>
    <span className="font-display text-sm font-bold tracking-[0.3em] text-primary-500">
      {num}
    </span>
    <span className="h-px w-12 bg-primary-500/60" aria-hidden="true" />
    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-light-text-secondary dark:text-dark-text-secondary">
      {title}
    </span>
  </div>
);

SectionHeading.propTypes = {
  num: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SectionHeading;
