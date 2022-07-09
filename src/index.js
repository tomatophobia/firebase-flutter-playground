import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // https://velog.io/@kysung95/짤막글-react-strict-모드란
  // strict mode를 사용하는 경우 2번 호출되는 함수들이 생긴다
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
)
