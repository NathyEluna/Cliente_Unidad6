import "../../css/contenedor.css";

const Contenedor = (props) => {
    const {children} = props;

    return(
        <>
            <div className="contenedor-contenedor">
                {children}
            </div>
        </>
    )
};

export default Contenedor;