import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import spinner from "../img/Spinner-2.gif";

// People sayfasından gönderilen onClick={() => navigate(`${id}`, { state: person })} state içerisindeki veriyi useLocation Hook u ile alabiliyoruz. People sayfasından <PersonDetail /> sayfasına giderken veri gönderiyoruz path ile bunuda useLocation aracılıgı ile alıyoruz.Bulundugumuz linkten hedefteki linke bu şekilde veri gönderilebilir. veriyi obje formatın da ve state adında { state: person } gönderiyoruz.zorunlu format. { state: person } tıklanılan person un verisini PersonDetail e yolluyoruz.ve bu işlem ile fecth yapmadan veriyi almış oluyoruz. veri url arası PersonDetail le ulastı.

//  PersonDetail = () componentine url üzerinden useLocation hook u ile bizim gönderdiğimiz person verisi geldi.navigate hook u ile state üzerinden person verisi geldi.
const PersonDetail = () => {
  //! navigate ile gonderilen state'i yakalamak icin useLocation Hook'u kullanilabilir.
  //! Bu durumda veri, state ile geldigi icin yeniden fetch yapilmasina gerek kalmaz.Ama aşagıda yine fetch yaptık.diğer yöntem.
  // const { state } = useLocation()
  // const { state: person } = useLocation() state in ismini : iki nokta ile person yaptık. state: person
  const navigate = useNavigate();

  //! People sayfasından  onClick={() => navigate(`${id}`, { state: person })}  navigate ile ${id} geliyor. url deki id parametresini useParams() ile aldık.Linkteki parametreyi almak icin useParams Hook'u kullanilabilir.
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  //! id parametresi ile sadece ilgili kişinin parametresini çekiyoruz.
  const getPerson = () => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          setError(true);
          setLoading(false);
          throw new Error("User can not be found");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setPerson(data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPerson();
  }, []);

  //! condition ile rendiring yaptık. error varsa <NotFound />; sayfasını bas. loading varsa img göster gibi. Bu sayfa bir component oldugu için her kosulda return olmalı. component return suz olmaz.
  if (error) {
    return <NotFound />;
  } else if (loading) {
    return (
      <div className="text-center mt-4">
        <img src={spinner} alt="spinner" />
      </div>
    );
  } else {
    return (
      <div className="container text-center">
        <h3>
          {person?.first_name} {person?.last_name}
        </h3>
        <img className="rounded" src={person?.avatar} alt="" />
        <p>{person?.email}</p>
        <div>
          <button
            onClick={() => navigate("/")}
            className="btn btn-success me-2"
          >
            Go Home
          </button>
          <button onClick={() => navigate(-1)} className="btn btn-warning">
            Go Back
          </button>
        </div>
      </div>
    );
  }
};

export default PersonDetail;

//! navigate("/") ana sayfaya gider.
//! navigate(-1) bir geri sayfa gider.
//! navigate(-2) history de -2 varsa 2 sayfa geri gider.

//!   const { id } = useParams(); hook u url de bulunan parametreyi yakalar.
/*
  const getPerson = () => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        if (!res.ok) { //! ok boolean bir deger veri gelmemişse hata fırlattık.throw ile hata fırlattıgımızda otomatikmen catch bloguna gidiyor.alt taraftaki kodları atlar.
          setError(true);
          setLoading(false);
          throw new Error("User can not be found");
        }
        return res.json(); //! {} süslü açıldıgı için return kullandık
      })
      .then((data) => {
        setLoading(false);
        setPerson(data.data);
      })
      .catch((err) => console.log(err));
  };*/
//! sayfanın çalışma Mantıgı
//! 1- url e adres girdigimizde browser routera gelir. /people/45 yazdıgımızda App içerisindeki link lere bakıyor. eşleşen var mı diye. <Route path="/people/:id" element={<PersonDetail />}  PersonDetail çagırılıyor.
//! 2- PersonDetail sayfasında person error ve loading state leri kurulur degerlerini alır 
//! 3- return kısmı çalışır loading true oldugu için loading çalışır ve return bittikten sonra useEffect kısmı çalışır. 
//! 4- useEffect de componentDidMount kısmı yani getPerson(); fonk çalışır ve fetch atılır stateler güncellendiğinde de tekrar render edilir.