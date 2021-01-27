import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, saveProduct, deleteProduct } from '../actions/productActions';

function ProductsScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productList = useSelector(state => state.productList)
    const {products} = productList;

    const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
          setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
          //
        };
      }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true)
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setDescription(product.description);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);

    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        );
    };

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id))
    }
    return <div className="content content-margined">

        <div className="product-header">
            <h3>Produtos</h3>
            <button className="button primary" onClick={() => openModal({})}>Criar produto</button>
        </div>

        {modalVisible &&

            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">

                        <li>
                            <h3>Criar produto</h3>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">
                                Nome
                            </label>
                            <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="price">
                                Preço
                             </label>
                            <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="image">
                                Imagem
                            </label>
                            <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="description">
                                Descrição
                             </label>
                            <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                        </li>

                        <li>
                            <label htmlFor="brand">
                                Marca
                             </label>
                            <input type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="category">
                                Categoria
                             </label>
                            <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor="countInStock">
                                Estoque
                            </label>

                            <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">{id ? "Atualizar" : "Criar Produto"}</button>
                        </li>

                        <li>
                            <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Fechar formulario</button>
                        </li>
                    </ul>
                </form>
            </div>

        }

        <div className="product-list">


            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Marca</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (<tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button className="button" onClick={() => openModal(product)}>Editar</button>
                            {' '}
                            <button className="button" onClick={() => deleteHandler(product)}>Deletar</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    </div>

}

export default ProductsScreen;


//validation signUser react
