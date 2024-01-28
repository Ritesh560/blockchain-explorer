import { forwardRef, useState } from 'react';

const ProfilePicture = ({ className, alt = 'user', showDefault, profile_image, ...rest }, ref) => {
  const [imageURL, setImageURL] = useState(
    profile_image || 'https://cdn.ringover.com/img/users/default.jpg'
  );

  const onError = ({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = 'https://cdn.ringover.com/img/users/default.jpg';
  };

  return (
    <img
      src={showDefault ? 'https://cdn.ringover.com/img/users/default.jpg' : imageURL}
      className={className}
      ref={ref}
      alt={alt}
      {...rest}
      onError={onError}
    />
  );
};

export default forwardRef(ProfilePicture);
