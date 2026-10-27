interface IconProps {
  id: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

const Icon = ({ id, size = 20, width, height, className }: IconProps) => {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      className={className}
      aria-hidden="true"
    >
      <use href={`/sprite.svg#icon-${id}`} />
    </svg>
  );
};

export default Icon;
