type ProfileProps = {
  className?: string;
};

export const Profile = (props: ProfileProps) => {
  const { className } = props;

  return (
    <h1 className={`page-profile ${className}`}>
      Profile
    </h1>
  );
};
