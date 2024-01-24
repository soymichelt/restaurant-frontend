type HomeProps = {
  className?: string;
};

export const Home = (props: HomeProps) => {
  const { className } = props;

  return (
    <h1 className={`page-home ${className}`}>
      Home
    </h1>
  );
};
