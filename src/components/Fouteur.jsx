import "../style/fouteur.css";

const Fouteur = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container-fouteur">
        <p className="fouteur1">&copy; {new Date().getFullYear()} 2atelecom. tout droit réservé.</p>
        <p className="fouteur2">Contacts: 77 515 27 49/ 76 722 77 77</p>
        <p className="fouteur3">Email: 2atelecompwf@gmail.com</p>
      </div>
    </footer>
  );

}

export default Fouteur;