import "./App.css";

import { useState } from "react";
import {
  useLocation,
  HashRouter,
  NavLink,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const LogoutBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/login");
      }}
    >
      登出
    </button>
  );
};

const TodoList = ({ showLinks, setShowLinks }) => {
  // useLocation() 這個 Hook，可以使這個元件不論是透過「回上頁」or「a連結」，都能再重新渲染一次
  useLocation();
  setShowLinks(true);
  return (
    <>
      <p>這是 Todo 頁面</p>
      <p>Todo 列表：</p>
      {showLinks &&
        data.map(item => {
          return (
            <>
              <NavLink key={item.id} to={`/todo/${item.id}`}>
                編號為 {item.id} 的 Todo
              </NavLink>
              <br />
            </>
          );
        })}
      <Outlet></Outlet>
      <LogoutBtn />
    </>
  );
};
const TodoId = ({ showLinks, setShowLinks }) => {
  let params = useParams();
  setShowLinks(false);
  return (
    <>
      <p>你目前在編號為：{params.todoId} 的 Todo</p>
      <NavLink to="/todo">回到 Todo 頁面</NavLink>
      <br />
    </>
  );
};
const Login = () => {
  return <p>這是登入頁面</p>;
};
const Register = () => {
  return <p>這是註冊頁面</p>;
};
const HomePage = () => {
  return <p>這是首頁</p>;
};

function App() {
  const [showLinks, setShowLinks] = useState(true);
  return (
    <div className="container">
      <HashRouter>
        <div className="nav-link">
          <NavLink to="/">
            <p>回到首頁</p>
          </NavLink>
          <NavLink to="/register">
            <p>註冊頁面</p>
          </NavLink>
          <NavLink to="/login">
            <p>登入頁面</p>
          </NavLink>
          <NavLink to="/todo">
            <p>Todo 頁面</p>
          </NavLink>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/todo"
            element={
              <TodoList showLinks={showLinks} setShowLinks={setShowLinks} />
            }
          >
            <Route
              path=":todoId"
              element={
                <TodoId showLinks={showLinks} setShowLinks={setShowLinks} />
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
