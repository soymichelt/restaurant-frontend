type SigninProps = {
  className?: string;
};

export const Signin = (props: SigninProps) => {
  const { className } = props;

  return (
    <h1 className={`page-signin ${className}`}>
      Signin
    </h1>
  );
};
