import '../App.css';
import AsideApp from './Aside';
import FooterApp from './Footer';
import HeaderApp from './Header';
import NavApp from './Nav';

function Layout(props) {
  return (
   <>
    <HeaderApp/>
    <NavApp/>
    <main class="content">{props.children}</main>
    <AsideApp/>
    <FooterApp/>
   </>
  );
}
export default Layout;
