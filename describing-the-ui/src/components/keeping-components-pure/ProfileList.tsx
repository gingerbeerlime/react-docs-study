import Profile from './Profile'

const ProfileList = () => {
  return (
    <>
      <Profile
        person={{
          imageId: 'lrWQx8l',
          name: 'Subrahmanyan Chandrasekhar',
        }}
      />
      <Profile
        person={{
          imageId: 'MK3eW3A',
          name: 'Creola Katherine Johnson',
        }}
      />
    </>
  )
}

export default ProfileList
