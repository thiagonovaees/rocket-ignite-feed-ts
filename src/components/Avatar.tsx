import styles from "./Avatar.module.css";

// Propiedade hasBorder define se o avatar tem ou não a borda verde;
// Pode ser passada dentro das props do component e tem com padrão o true;
export function Avatar({ hasBorder, src }) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  );
}
