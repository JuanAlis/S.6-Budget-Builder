import styled from "styled-components";
import imagenBanner from "../../assets/imagenBanner.jpg";

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;

`;

const NavBar = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 40px;
    margin-left: 20px;
`;

const Logo = styled.img`
    height: 30px;
    margin-right: 10px;
`;

const Banner = styled.div`
    margin-top:40px;
    width: 80%;
    background-image: url(${imagenBanner});
    background-size: cover;
    background-position: top;
    border-radius: 30px;
    padding: 50px;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    background: brown;
`;

const BackButton = styled.button`
  display: inline-block;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
  border: none;
  border-radius: 30px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 5px 15px rgba(255, 65, 108, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  /* 🎉 Animación de rebote */
  &:hover::after {
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    opacity: 1;
    transition: left 0.2s ease-in-out;
  }
`;
const Header = () => {
    return (
        <HeaderContainer>
            
            <NavBar>
                <Logo src={"/logo.svg"} alt="Logo" />
                Frontender.itacademy
                
            </NavBar>
            <div style={{ textAlign: "center", marginTop: "20px", display: "flex", justifySelf: "flex-end" }}>
                <BackButton onClick={() => window.location.href = "/"}>Go back</BackButton>
            </div>
            <Banner>
                Aconsegueix la millor qualitat
            </Banner>
        </HeaderContainer>
    );
};

export default Header;
