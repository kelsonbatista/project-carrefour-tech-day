import { Formik } from "formik";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Button, Form, Overlay, Popover } from "react-bootstrap";
import { AiOutlineDownCircle } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { connect } from "react-redux";
import * as Yup from "yup";
import { setNewPostalCode } from "../../store/actions";
import Loading from "../Loading";
import "./styles.css";

const NavBar = (props) => {
  const { city, dispatchUser } = props;
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const schema = Yup.object().shape({
    zip: Yup.string()
      .required("Digite um cep")
      .matches(/^([0-9]{5}-[0-9]{3})$/, { message: "Formato inválido" })
      .max(9, "O cep deve possuir no máximo 9 caracteres!"),
  });

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <>
      <div className="products__navbar">
        <div className="products__navbar-items">
          <ul>
            <li>Todos departamentos</li>
            <li>Ofertas do dia</li>
            <li>Mundo Gamer</li>
            <li>Smartphones</li>
            <li>Pneus & Auto</li>
            <li>Xiaomi</li>
            <li>Notebooks</li>
            <li>Eletrodomésticos</li>
          </ul>
        </div>
      </div>
      {typeof seller !== "object" ? (
        <div className="products__seller">
          <div className="products__seller-info">
            <div className="products__user">
              <div>
                <IoLocationOutline size="20px" />
              </div>
              <div>{`Ofertas para: ${city}`}</div>
              <div ref={ref}>
                <AiOutlineDownCircle
                  className="products__newCep"
                  size="20px"
                  onClick={handleClick}
                />
                <Overlay
                  show={show}
                  target={target}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained">
                    <Popover.Header as="h3">Trocar região</Popover.Header>
                    <Popover.Body>
                      <p>
                        Informe seu CEP para ver{" "}
                        <strong>ofertas exclusivas</strong> da sua região.
                      </p>
                      <Formik
                        validationSchema={schema}
                        onSubmit={(values) => {
                          // console.log(values.zip);
                          dispatchUser(values.zip);
                        }}
                        initialValues={{ zip: "" }}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          touched,
                          isValid,
                          errors,
                        }) => (
                          <Form
                            className="products__form"
                            noValidate
                            onSubmit={handleSubmit}
                          >
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Digite seu CEP:</Form.Label>
                              <div className="products__form-div">
                                <div>
                                  <Form.Control
                                    className="products__input"
                                    type="text"
                                    maxLength="9"
                                    name="zip"
                                    value={values.zip}
                                    onChange={handleChange}
                                    isInvalid={!!errors.zip}
                                    placeholder="00000-000"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.zip}
                                  </Form.Control.Feedback>
                                </div>
                                <div>
                                  <Button
                                    className="products__button btn btn-primary"
                                    type="submit"
                                    variant="primary"
                                    id="button-addon1"
                                  >
                                    OK
                                  </Button>
                                </div>
                              </div>
                            </Form.Group>
                          </Form>
                        )}
                      </Formik>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

NavBar.propTypes = {
  city: PropTypes.string,
  seller: PropTypes.string,
  dispatchUser: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  city: state.user.city,
  seller: state.seller,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (user) => dispatch(setNewPostalCode(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
