import "../../css/contenido.css";

const Contenido = ({ children }) => {
    return (
        <div className="contenido">
            {children}
        </div>
    );
};

export default Contenido;