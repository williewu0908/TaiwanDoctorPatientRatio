import styles from './Tooltip.module.css';  // 确保导入正确的 CSS 模块

export default function Tooltip({ display, x, y, content }) {
  return (
    display && (
      <div className={styles.tooltip} style={{ top: `${y}px`, left: `${x}px` }}>
        {content}
      </div>
    )
  );
}
