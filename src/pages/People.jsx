import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

//? Link, NavLink ve Navigate componentleri declarative routing gerceklestirmek icin kullanilir.
//? Ornegin: Link ve NavLink Sayfada gorulebilen, kullanciyla bir etkilesim icerisinde bulunarak yonlendirme yapilan bir
//? componentlerdir.

//? Navigate componenti sayfada gorulmeyen ve programsal olarak bir linkin bir baska linke yonledirilmesi icin kullanilabilir.
//? Navigate, Component seviyesi Routing icin kullanilir. peopla tıklayınca /people/${id} id li yere direk gidiyor.
//<Navigate to={`/people/${id}`} /> */} <Navigate to dogrudan yönlendirme yapıyor. people a tıklasak DİREK /people/${id} id li yere gidiyor. onClick={() => navigate(`/people/${id}`)} onClick li kullanım koşullu tıklanıldıgında oluyor.

//* useNavigate() ise imperative=zorunlu routing icin elverislidir.
//* Ornegin bir fonksiyon,event veye UseEffect icerisinde programsal olarak yonledirme yapmak icin kullanilabilir.
//! 1- useEffect componentDidmount aşamasında getPeople fonk. ile verimiz apiden çekiliyor. çekilen veri setPeople(data.data) ile people adındaki değişkenimize yazıyoruz. people da aşagıda map ile itere edip dom a basıyoruz.

const People = () => {
  const [people, setPeople] = useState([]);
  //! useNavigate hook u bir fonk. döndürür. bunu bir değişkene navigate atadık.değişkenin ismi farklı olabilir. useNavigate ti anımsatsın diye navigate kullanılıyor.
  const navigate = useNavigate();

  const getPeople = () => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((data) => setPeople(data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPeople();
  }, []);

  //! onClick={() => navigate(`${id}`, { state: p })}
  //! dinamik link verme - dinamik hook oluşturma useNavigate hook u ile oluşturulur. yukarda useNavigate() hook unu bir değişkene atadık ve artık onClick={() => navigate(`${id}`, { state: p })} navigate hook u ile yeni bir route dinamik olarak oluşturabiliriz.
  return (
    <div className="container text-center mt-4">
      <h1>PEOPLE LIST</h1>
      <div className="row justify-content-center g-3">
        {people?.map((person) => {
          const { id, first_name, last_name, avatar } = person;
          return (
            <div
              key={id}
              className=" col-sm-12 col-md-6 col-lg-4"
              type="button"
              //? Absolute path (tam adres vermek)
              // onClick={() => navigate(`/people/${id}`)}
              //! navigate hook u ile ilgili kişinin bilgisini gönderebiliriz. veriyi bu componentten başka yere gönderebiliyoruz.veriyi link üzerinden gönderiyoruz. link <PersonDetail /> sayfasına gidiyor veriyi orda alabiliriz.{ state: person } tıklanılan person un verisini PersonDetail e yolluyoruz.
              onClick={() => navigate(`${id}`, { state: person })}
            >
              <img className="rounded" src={avatar} alt="img" />
              <h6>
                {first_name} {last_name}
              </h6>

              {/* <Link to ile ekranda link sabit bir şekilde kalır. yukarda ise resme tıkladıgımızda dinamik olarak gidiyor.
              <Link to={`/people/${id}`}> Deneme</Link>
              <Navigate to dogrudan yönlendirme yapıyor. people a tıklasak direk /people/${id} id li yere gidiyor. yukardaki onClick={() => navigate(`/people/${id}`)} onClick li kullanım koşullu tıklanıldıgında oluyor.
              <Navigate to={`/people/${id}`} /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default People;
//! useNavigate kullanım şekli
//1- import edilcek import { useNavigate } from "react-router-dom";
// useNavigate fonk return ediyor bunu biz bir değişkene aktarıp kullanabiliyoruz.
//2- useNavigate başka bir değişkene aktarıyoruz. const navigate = useNavigate();
//3- navigate fonk oldugu için ancak onClick tarzı yerlede kullanılabilir.fonk. kullanılabildiği yerlerde kullanabilirz. onClick={() => navigate(`${id}`, { state: person })}
// Özetle useNavigate hook u fonk. gibi kullanılabilir.fonk. kullanılabildiği yerlerde dinamik router olusturabiliriz.

//! Relative path (goreceli adres vermek) yani BULUNDUĞU KONUMDAN id yi ekleyerek adrese git.
//! onClick={() => navigate(`${id}`, { state: person })}
//! Relative path in güzel yani /home/people/details vs diye bir adres var people kaldırılırsa güncellemeye gerek yok gibi göreceli oldugu için ona göre ayarlanıyor vs??? . nested yapılarda Relative path kullanmak mantıklı.
//? Absolute path (tam adres vermek) nokta atışı yere gitmek için

/* <Link  ve  <Navlink de linkler ekranda kalır. ama ekranda kalmasını istemiyorsak örn resmi tıklanınca ilgili sayfaya gitsin diyorsak useNavigate(); hook unu kullanmak lazım yada <Navigate to component seviyesinde ki hook kullanılmalı.
<Link to ile ekranda link sabit bir şekilde kalır. yukarda ise resme tıkladıgımızda dinamik olarak gidiyor.
<Link to={`/people/${id}`}> Deneme</Link>
<Navigate to dogrudan yönlendirme yapıyor. people a tıklasak direk /people/${id} id li yere gidiyor. yukardaki onClick={() => navigate(`/people/${id}`)} onClick li kullanım koşullu tıklanıldıgında oluyor.
<Navigate to={`/people/${id}`} /> */

//! ÖNEMLİ
//! useNavigate() ile url den veri yollayabiliyoruz.
//! useLocation ile url den gelen veriyi karşılıyoruz
//! onClick={() => navigate(`${id}`, { state: person })
//! useParams() -> navigate ile gönderilen parametreyi de ${id} yi de const { id } = useParams(); hook u ile alabiliyoruz.
