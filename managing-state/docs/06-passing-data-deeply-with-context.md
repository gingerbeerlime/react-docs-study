## Context를 사용해 데이터를 깊게 전달하기

부모 컴포넌트에서 자식 컴포넌트로 props를 통해 데이터를 전달할 때

- 중간에 많은 컴포넌트를 거쳐야 하거나
- 많은 컴포넌트에서 동일한 데이터가 필요한 경우

`Context`를 사용해 부모 컴포넌트가 **트리 아래에 있는 모든 컴포넌트에** 깊이와 상관없이 `props`를 통하지 않고 데이터를 전달할 수 있다.

### Context 사용하기

1. Context 생성하기
2. 데이터가 필요한 컴포넌트에서 context 사용하기
3. 데이터를 지정하는 컴포넌트에서 context 제공하기

#### (1) Context 생성하기

```jsx
import { createContext } from 'react'

export const LevelContext = createContext(1)
```

- `createContext`의 유일한 인자는 **기본값**. 모든 종류의 값을 전달할 수 있다.
- `context`를 제공하지 않고 사용하면 지정된 기본값 `1`을 사용한다.

#### (2) Context 사용하기

```jsx
import { useContext } from 'react'
import { LevelContext } from './LevelContext.js'

export default function Heading({ children }) {
  const level = useContext(LevelContext)
  // ...
}
```

- `prop`으로 level을 받아오는 대신 `context`에서 값을 읽도록 함
- `useContext` 훅
  - 리액트에게 `Heading` 컴포넌트가 `LevelContext`를 읽으려 한다는 것을 알리는 역할
  - 컴포넌트 내부 최상단에서 호출해야 함.(조건문,반복문 내부 호출❌)

#### (3) Context 제공하기

```jsx
export default function Section({ children }) {
  return <section className='section'>{children}</section>
}
```

🔽 `LevelContext`를 자식들에게 제공하기 위해 `context provider`로 감싸준다.

```jsx
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
     // [Context명].Provider 형태로 제공
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>a
  );
}
```

- `<section>` 하위 트리에 포함된 모든 컴포넌트는 `LevelContext`를 사용할 수 있다.
- 만약 하위 트리에 `LevelContext`가 중첩되어 제공되고 있는 경우, 자식 컴포넌트는 **UI 트리에서 가장 가까운 `LevelContext`의 값을 사용**한다.
  ```jsx
  export default function Page() {
    return (
      <Section level={1}>
        ... // 여기 포함된 컴포넌트는 level 1을 사용
        <Section level={2}>
          ... // 여기 포함된 컴포넌트는 level 2를 사용
          <Section level={3}>
            ... // 여기 포함된 컴포넌트는 level 3을 사용
  ```

---

### 같은 컴포넌트에서 context를 사용하며 제공하기

```jsx
// context를 사용하며
import { useContext } from 'react';
// context 제공하기
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
 // context 읽기: 가장 가까운 상위 context 값을 읽음
 const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>a
  );
}
```

- 각 `Section`은 위의 `Section`에서 `level`을 읽고 자동으로 `level + 1`을 전달할 수 있다

```jsx
export default function Page() {
  return (
   // context를 제공하지 않았기에 기본값 1 사용 -> level + 1 -> level = 2
    <Section>
      ...
     // 위의 LevelContext 가 2이므로 level=3
      <Section>
        ...
        // 위의 LevelContext 가 3이므로 level=4
        <Section>
          ...
```

> 📍 Context는 위의 예시 말고도 **전역 상태 관리가 필요한 곳**에 주로 사용된다.
>
> - **인증 정보** : 로그인 여부, 사용자 정보 등을 앱 전체에서 공유할 때
> - **라우팅**: 대부분의 라우팅 솔루션은 현재 경로를 유지하기 위해 내부적으로 context를 사용
> - **다국어 처리** : 현재 언어 설정 및 다국어 번역 함수 등
> - `테마` : 다크모드/라이트모드 같은 테마 상태를 전체 앱에서 공유할 때
> - **글로벌 상태 공유**: React Query, Zustand, Redux를 쓰지 않고 간단한 전역 상태가 필요할 때(모달 열림 여부, 알림 메시지, 필터 값 등)
> - **설정 정보**: API URL, 기능 ON/OFF 설정, 앱의 전역 설정값 등

> 🔴 빈번하게 변경되는 상태를 context로 관리하면 성능 문제가 생길 수 있으므로 useReducer, memo 조합을 고려해볼 수 있다. → 더 알아보기

### Context로 중간 컴포넌트 지나치기

`Context`의 작동방식은 **`CSS`의 속성 상속**과 비슷한 구조를 가진다.

- 리액트에서 위에서 가져온 어떤 `context`를 **재정의** 하는 유일한 방법은 자식들을 다른 값을 가진 `context provider`로 래핑하는 것이다
- 그러나 `css`에서 `color`와 `background-color`와 같이 다른 속성들은 서로 영향을 주지 않는 것 처럼 **서로 다른 `React context`는 영향을 주지 않는다**

`createContext()`로 만든 각각의 `context`는 완벽히 분리되어 있고 특정 `context`를 사용 및 제공하는 컴포넌트끼리 묶여 있다. 하나의 컴포넌트는 서로 다른 다수의 `context`를 사용하거나 제공할 수 있다.

### Context를 남용하지 말 것

1. **`Props` 전달하기로 시작하기** : 기본적으로 `props`는 어떤 컴포넌트가 어떤 데이터를 사용하는지 **데이터 흐름을 명확히 보여주므로** `context`는 꼭 필요한 곳에 사용하는 것이 좋다.
2. 컴포넌트를 추출하고 **JSX를 `children`으로 전달하기** : 데이터를 여러 컴포넌트를 거쳐서 `props` 전달하고 있다면 구조가 제대로 짜여져있는지 다시 검토해보는 것이 좋다. 중간 컴포넌트가 그 데이터를 쓰지 않는다면 컴포넌트를 나눠서 구조를 개선해볼 수 있다.

   ```jsx
   function App() {
     const posts = [...]; // 게시물 데이터

     return <Layout posts={posts} />;
   }

   function Layout({ posts }) {
     return (
       <Main posts={posts} />
     );
   }

   function Main({ posts }) {
     return (
       <Posts posts={posts} />
     );
   }

   function Posts({ posts }) {
     return (
       <ul>
         {posts.map(post => <li>{post.title}</li>)}
       </ul>
     );
   }
   ```

   - `Layout`과 `Main`은 `posts` 데이터를 사용하지 않고 단지 전달만 해주고 있음

     - ⇒ 이럴 때 무조건 Context 사용? ❌
     - ⇒ 컴포넌트 분리 + `children` 으로 구조 개선 ✅

       ```jsx
       function App() {
         const posts = [...];

         return (
           <Layout>
             <Posts posts={posts} />
           </Layout>
         );
       }

       function Layout({ children }) {
         return (
           <div className="layout">
             <Header />
             {children}
           </div>
         );
       }

       function Posts({ posts }) {
         return (
           <ul>
             {posts.map(post => <li>{post.title}</li>)}
           </ul>
         );
       }
       ```
