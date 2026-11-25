export default function Container({ children, className = "" }) {
  const containerStyle = `mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 ${className}`;
  return <div className={containerStyle}>{children}</div>;
}
