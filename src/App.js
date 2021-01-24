import {useEffect, useState} from "react";
import {fetchImages} from "./api";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">どせいさん風ギャル文字ジェネレーター</h1>
        </div>
      </div>
    </header>
  );
}

function OutputArea() {
  const [output, setOutput] = useState(null);
  return (
      <div className="column is-three-fifths is-offset-one-fifth">
          <ConvertGalString galString={"こんにちは"} />
      </div>
  );
}

function InputArea() {
  return (
      <div className="column is-three-fifths is-offset-one-fifth">
        <textarea className="textarea is-size-3" value="こんにちは">
        </textarea>
      </div>
  );
}




function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog!" />
        </figure>
      </div>
    </div>
  );
}

function Loading(){
  return <p>Loading...</p>;
}

function ConvertGalString(props) {
  
  const before_dosei_char = ['い', 'き', 'く', 'さ', 'し', 'せ', 'そ', 'ち', 'つ', 'て', 'の', 'ひ', 'へ', 'み', 'も', 'や', 'ら', 'り', 'る', 'ん', 'ぎ', 'ぐ', 'ざ', 'じ', 'ぜ', 'ぞ', 'ぢ', 'づ', 'で', 'ば', 'び', 'べ']
  const after_dosei_char = ['Ɩı', '₹', 'ㄑ', 'ㄜ', 'ι', 'ㄝ', 'ƺ', 'ㄘ', '⊃ ', 'Շ', '๑', 'Ʊ', 'ㄟ', 'Ⴋ', 'Ⱡ', '兯', 'ʖˋ', 'ﾚ）', 'ʓ', 'ƕ ', '₹˝', 'ㄑ˝', 'ㄜ˝', 'ι˝', 'ㄝ˝', 'ƺ˝', 'ㄘ˝', '⊃ ˝', 'Շ˝', '∣ժ̅˝', 'Ʊ˝', 'ㄟ˝']
  var storeString = []
  const { galString } = props;
  console.log(galString)
  for (let i = 0; i < galString.length; i++){
    if (before_dosei_char.indexOf(galString[i]) != -1){
      console.log("あります")
      storeString.push(after_dosei_char[i])
    } else {
      console.log("ないです")
      storeString.push(galString[i])
    }
  }
  return (
    <textarea className="textarea is-size-3">
      {storeString.join('')}
    </textarea>
  )
}
function Gallery(props) {

  const { urls } = props;
  if ( urls == null){
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map( (url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect( () => {
    fetchImages("pug").then((urls) => {
      setUrls(urls);
    });
  }, []);
  return (
    <main>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Cat API</p>
        <p>
          <a href="https://thecatapi.com/about">Donate to Cat API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <OutputArea />
      <InputArea />
      <Footer />
    </div>
  );
}

export default App;