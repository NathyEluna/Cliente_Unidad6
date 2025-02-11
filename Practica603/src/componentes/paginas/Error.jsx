import "../../css/contenedorError.css";

const Error = () => {
return (
    <div className="contenedorError">
        <article className="error">
            <h1> ¡Alerta, aventurero! </h1>
            <h2> Algo salió mal en tu misión. </h2>
            <section>
                <p> ¡Malditos miembros de la Horda, siempre causando problemas! </p>
                <p> ¡Vuelve a intentarlo! </p>
            </section>
        </article>
    </div>
);
};

export default Error;