import { Profile } from './Profile'

export default function Gallery() {
  // 컴포넌트 내부에 다른 컴포넌트를 정의할 수 없음 => 느리고 버그 가능성
  // function Profile() {
  //   return <img src='https://picsum.photos/300/200' alt='random photo' />
  // }

  return (
    <section>
      <h1>Random photos</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  )
}
