import React, { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { propiedadStartLoading, propiedadStartUpdate, propiedadStartCreate, propiedadStartDelete } from '../../actions/propiedad';
import Modal from 'react-modal';
import { useForm } from '../../hooks/useForm';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement('#root');
export const HomeScreen = () => {

    const dispatch = useDispatch();
    const {propiedades} = useSelector(state => state.propiedades);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [propiedadSeleccionada, setPropiedadSeleccionada] = useState({})
    const [accionModal, setAccionModal] = useState('')

    const [formPropiedadValues, handlePropiedadInputChange, reset] = useForm({
        Nombre: '',
        Valor: '',
        Descripcion: '',
        Atributo: '',
    });

    const {Nombre, Valor, Descripcion, Atributo} = formPropiedadValues;

    useEffect(() => {  
        dispatch(propiedadStartLoading());
    }, [!propiedades]);

    const openModal = (propiedad, accion) => {
        setPropiedadSeleccionada(propiedad);
        setAccionModal(accion);
        reset({
            Nombre: propiedad.Nombre || '',
            Valor: propiedad.Valor || '',
            Descripcion: propiedad.Descripcion || '',
            Atributo: propiedad.Atributo || '',
        })
        setIsOpen(true);
    } 
    
    const closeModal = () => {
        setIsOpen(false);
    } 
    
    const openModalDelete = (propiedad) => {
        setPropiedadSeleccionada(propiedad);
        setIsOpenDelete(true);
    } 
    
    const closeModalDelete = () => {
        setIsOpenDelete(false);
    } 

    const handleEditarPropiedad = (e) => {
        e.preventDefault();
        console.log(propiedadSeleccionada)
        if(accionModal === 'editar'){
            dispatch(propiedadStartUpdate({
                Nombre,
                Valor,
                Descripcion,
                Atributo,
                IDPropiedades: propiedadSeleccionada.IDPropiedades
            }))
        } else {
            dispatch(propiedadStartCreate({
                Nombre,
                Valor,
                Descripcion,
                Atributo,
                IDPropiedades: null
            }))
        }
        closeModal();
    }

    const handleDeletePropiedad = (e) => {
        e.preventDefault();
        dispatch(propiedadStartDelete(propiedadSeleccionada.IDPropiedades));
        closeModalDelete();
    }

    return (
        <div>
            <Navbar/>
            <button className="btn btn-primary btn-sm ms-1 mt-2 mb-2" type="button" onClick={()=>openModal({}, 'crear')}>Agregar</button>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Atributo</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        propiedades.map( propiedad => (
                            <tr key={propiedad.IDPropiedades}>
                            <th scope="row">{propiedad.IDPropiedades}</th>
                            <td>{propiedad.Nombre}</td>
                            <td>{propiedad.Valor}</td>
                            <td>{propiedad.Descripcion}</td>
                            <td>{propiedad.Atributo}</td>
                            <td>
                            <button className="btn btn-danger btn-sm" type="button" onClick={()=>openModalDelete(propiedad)}>Eliminar</button>
                            <button className="btn btn-primary btn-sm ms-1" type="button" onClick={()=>openModal(propiedad, 'editar')}>Editar</button>
                            </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Modal
                isOpen={isOpen}
                //   onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h1>{accionModal === 'editar'? 'Editar Propiedad' : 'Crear Propiedad' }</h1>
                <hr/>
                <form onSubmit={handleEditarPropiedad}>
                            <div className="form-group">
                                <label className="form-label">Nombre</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="Nombre"
                                    value={Nombre}
                                    onChange={handlePropiedadInputChange}
                                />
                            </div>
                            <div className="form-group mt-2">
                            <label className="form-label">Valor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Valor"
                                    name="Valor"
                                    value={Valor}
                                    onChange={handlePropiedadInputChange}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label className="form-label">Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Descripción"
                                    name="Descripcion"
                                    value={Descripcion}
                                    onChange={handlePropiedadInputChange}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label className="form-label">Atributo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Atributo"
                                    name="Atributo"
                                    value={Atributo}
                                    onChange={handlePropiedadInputChange}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>cancelar</button>
                                <button type="submit" className="btn btn-primary ms-5">{accionModal}</button>
                            </div>
                        </form>
            </Modal>
            <Modal
                isOpen={isOpenDelete}
                //   onAfterOpen={afterOpenModal}
                onRequestClose={closeModalDelete}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h1 className="mb-4">¿Desea eliminar ésta propiedad?</h1>
                <button type="button" className="btn btn-secondary" onClick={closeModalDelete}>cancelar</button>
                <button type="button" className="btn btn-danger ms-5" onClick={handleDeletePropiedad}>Eliminar</button>
            </Modal>
        </div>
    )
}
