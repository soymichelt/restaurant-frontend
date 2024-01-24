type SignupProps = {
  className?: string;
};

export const Signup = (props: SignupProps) => {
  const { className } = props;

  return (
    <h1 className={`page-signup ${className}`}>
      Signup
    </h1>
  );
};
