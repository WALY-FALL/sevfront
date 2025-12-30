import "../style/fouteur.css";

const Fouteur = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container-fouteur">
        <p>&copy; {new Date().getFullYear()} 2atelecom. tout droit réservé.</p>
      </div>
    </footer>
  );

}

export default Fouteur;