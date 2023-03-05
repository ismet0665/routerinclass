import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import People from "./pages/People";
import PersonDetail from "./pages/PersonDetail";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Paths from "./pages/Paths";
import FullStack from "./pages/Fullstack";
import Aws from "./pages/Aws";
import ReactJS from "./pages/ReactJS";
import Login from "./pages/Login";
import PrivateRouter from "./pages/PrivateRouter";

//! Aşagıdaki açıklama önemli.

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
        {/* react-routerda path de bir değişken ile ilgili adrese gitmek istiyorsak path de değişkeni /:id : iki nokta ile yazmalıyız. : ile bunun bir parametre değişken oldugunu anlıyor. DİNAMİK path oluyor.ÖZETLE people ın ardından bir değişken gelirse onu <PersonDetail /> a yönlendir diyoruz.*/}
        <Route path="/people/:id" element={<PersonDetail />} />

        {/* Nested Route /paths altında fullstack ve react ı çagır ama çagırınca nereye basacagını bilmiyor. onu outlet ile belirtiyoruz."/paths" de outleti tanımlamamız lazım yoksa nereye basacagını bilemez. */}
        <Route path="/paths" element={<Paths />}>
          <Route path="fullstack" element={<FullStack />}>
            <Route path="react" element={<ReactJS />} />
          </Route>
          <Route path="" element={<Aws />} />{" "}
          {/*path="" yolu olmadıgı için açılışta aws gelir. default açılması için.*/}
        </Route>

        {/* contact sayfasına gitmek için önce  <PrivateRouter /> dan geçmek lazım. condition olmalı. <PrivateRouter /> süzgeç vazifesi görüyor. içerisinde de gizli olması gereken sayfalar yer alıyor. */}
        <Route path="/contact" element={<PrivateRouter />}>
          <Route path="" element={<Contact />} />
        </Route>

        {/* <Route path="/blog" element={<PrivateRouter />}>
          <Route path="" element={<Blog />} />
        </Route> */}

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
