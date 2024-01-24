type Page404 = {
  className?: string;
};

export const Page404 = (props: Page404) => {
  const { className } = props;

  return (
    <h1 className={`page-404 ${className}`}>
      404
    </h1>
  );
};
