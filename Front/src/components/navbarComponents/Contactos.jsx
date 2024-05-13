import useNavigation from "../../hooks/useNavigate";

export default function Contactos() {
  const { goToAboutUs } = useNavigation();
  return (
    <button
      onClick={goToAboutUs}
      className="text-black mx-5 text-lg flex items-center p-2 font-myfont"
    >
      Contacto
    </button>
  );
}
