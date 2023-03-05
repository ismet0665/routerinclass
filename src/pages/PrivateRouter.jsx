import { Navigate, Outlet } from "react-router-dom";

//? Bu kisim gercekte Global State'lerde tutulur. (Context API, Redux, Mobx)
//! const isSigned = userContext(jwt)
//! Client ı süzgeçten geçirdikten sonra ilgili sayfaya yönlendirme işlemi. client login olduysa şu sayfaya girebilsin gibi. contact sayfasına gitmeden burda bir condition yazılmalı. login olduktan sonra git gibi.gelen kişi acaba login olarak mı geldi yoksa login sizmi geldi.
const isSigned = true;

const PrivateRouter = () => {
  // return <div>{isSigned ? <Outlet /> : <Login />}</div> bu şekilde direk Login sayfasını çagırmak url yapısını bozar.
  return <div>{isSigned ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRouter;
