import React from 'react'
import { Modal, Container, Card, Row, Col, Form} from 'react-bootstrap'
import { db } from '../firebase/config'
import { Firestore, collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'
import { book, language } from 'fontawesome'
import Button from 'react-bootstrap/Button';

const headerCard = {
    fontSize: '22px',
    fontWeight: 'bold',
    height: '50%'
}

const itemCard = {
    fontSize: '18px',
    boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)'
}



const AdminPages =() =>  {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    const [Books, setBooks] = useState([]);

    const [Name, setName] = useState("");
    const [Author,setAuthor] = useState("");
    const [Price,setPrice] = useState("");
    const [DiscountPrice,setDiscountPrice] = useState("");
    const [PublishDate,setPublishDate] = useState("");
    const [Description,setDescription] = useState("");
    const [Category,setCategory] = useState("");
    const [Pages,setPages] = useState("");
    const [Language,setLanguage] = useState("");
    const [Size,setSize] = useState("");
    const [ImageURL, setImageURL] = useState("");

    function handleDelete(id){
        const docRef = doc(db,'Book',id)
        deleteDoc(docRef).then(() => fetchBooks()).catch(error=>console.log(error.message));
        setShowDeleteModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Name === "") { alert("Don't leave anythings empty");handleClose();return}
        if (Author === "") { alert("Don't leave anythings empty");handleClose();return}
        if (Price === "") { alert("Don't leave anythings empty");handleClose();return}
        if (PublishDate === "") { alert("Don't leave anythings empty");handleClose();return}
        if (Description === "") { alert("Don't leave anythings empty");handleClose();return}
        if (Category=== "") { alert("Don't leave anythings empty");handleClose();return}
        if (Language === "") { alert("Don't leave anythings empty");handleClose();return}
        if (Size === "") { alert("Don't leave anythings empty");handleClose();return}
        if (Pages === "") { alert("Don't leave anythings empty");handleClose();return}
        if (ImageURL === "") { alert("Don't leave anythings empty");handleClose();return}
        else{
            try{
            const addBook = await addDoc(collection(db,"Book"),{
                Name : Name,
                Author: Author,
                Price: Price,
                DiscountPrice: DiscountPrice,
                PublishDate: PublishDate,
                Description: Description,
                Category: Category,
                Pages: Pages,
                Language: Language,
                Size: Size,
                ImageURL: ImageURL,
                PostedDate: new Intl.DateTimeFormat('en-US',{year:"numeric", month:"long", day:"2-digit", hour:"2-digit",minute:"2-digit"}).format(Date.now()),
            });
            alert(`${Name} is added!`);
            }catch(e){
                console.error("Error adding document: ", e);
            }
            handleClose();
        }
    }

    useEffect(()=>{
        fetchBooks()
    }, [])
    useEffect(()=>{
        console.log(Books)
    }, [Books])

    function fetchBooks() {
        const bookCollection = collection(db,'Book');
        getDocs(bookCollection).then(response => {
            const book = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,}))
            setBooks(book)
        }).catch(error => console.log(error.message))
    }

    return (
    <Container className="col-12 flex mt-4 text-center mb-3 px-2 py-2">
        <Card className="col-10 m-auto text-center px-2 py-2 bg-light" style={headerCard}>
            <Row className="mt-4 mb-4">
                <Col className="col-3">Book Name</Col>
                <Col className="col-3">Author</Col>
                <Col className="col-2">Date</Col>
                <Col className="col-2">Price</Col>
            </Row>
        </Card>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Container>
                        <Col>
                            <Row>
                                <Form.Group className="col-6 ">
                                    <Form.Label>
                                        Book
                                    </Form.Label>
                                    <Form.Control name='Name'  onChange={(e)=> setName(e.target.value)} placeholder='The fault in our stars' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                                <Form.Group className="col-6 ">
                                    <Form.Label>
                                        Author
                                    </Form.Label>
                                    <Form.Control name='Author' value ={Author} onChange={(e)=> setAuthor(e.target.value)} placeholder='John Green' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                            </Row>
                            <Row >
                                <Form.Group className="col-6">
                                    <Form.Label>
                                        Publish Date
                                    </Form.Label>
                                    <Form.Control name='PublishDate' value ={PublishDate} onChange={(e)=> setPublishDate(e.target.value)} placeholder='19/02/2002' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label>
                                        Category
                                    </Form.Label>
                                    <Form.Control name='Category' value ={Category} onChange={(e)=> setCategory(e.target.value)} placeholder='Novel' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                            </Row>
                            <Row >
                                <Form.Group className="col-3">
                                    <Form.Label>
                                        Pages
                                    </Form.Label>
                                    <Form.Control name='Pages' value ={Pages} onChange={(e)=> setPages(e.target.value)} placeholder='332' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                                <Form.Group className="col-3">
                                    <Form.Label>
                                        Language
                                    </Form.Label>
                                    <Form.Control name='Language' value={Language} onChange={(e)=> setLanguage(e.target.value)} placeholder='English' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label>
                                        Size
                                    </Form.Label>
                                    <Form.Control name='Size' value={Size} onChange={(e)=> setSize(e.target.value)} placeholder='18cm x 10cm x 1,2cm' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="col-6">
                                    <Form.Label>
                                        Price
                                    </Form.Label>
                                    <Form.Control name='Price' value={Price} onChange={(e)=> setPrice(e.target.value)} placeholder='14.99' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label>
                                        Discount Price
                                    </Form.Label>
                                    <Form.Control name='DiscountPrice' value={DiscountPrice} onChange={(e)=> setDiscountPrice(e.target.value)} placeholder='19.99' className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                            </Row>
                            <Form.Group className="col-12">
                                    <Form.Label>
                                        Description
                                    </Form.Label>
                                    <Form.Control name='Description' value={Description} onChange={(e)=> setDescription(e.target.value)} placeholder="This story's about love..." as="textarea" rows={5} className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                            </Form.Group>
                            <Row>
                                <Form.Group className="col-12">
                                        <Form.Label>
                                            Image URL
                                        </Form.Label>
                                        <Form.Control name='ImageURL' value={ImageURL} onChange={(e)=> setImageURL(e.target.value)} placeholder="Book's cover link here!!" className='border shadow-sm p-3 mb-2 bg-white rounded'/>
                                </Form.Group>
                            </Row>
                            <Row className='m-2 d-flex flex-row-reverse'>
                                <Button className='col-3 m-1 btn-primary'type='submit'>Add</Button>
                                <Button className='col-3 m-1 btn-danger'onClick={()=>setShow(false)}>Cancel</Button>
                            </Row>
                        </Col>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>

        <Button className='m-3' onClick={()=>fetchBooks()}>Refresh</Button>
        <Button className='m-3' onClick={handleShow}>Add Book</Button>

        <Card className="col-10 m-auto text-center mb-3 px-2 py-2" style={itemCard}>
                {Books.map(book=>( <Row className="mt-4 mb-4"  key={book.id}>
                    <Col className="col-3" >{book.data.Name}</Col>
                    <Col className="col-3" >{book.data.Author}</Col>
                    <Col className="col-2" >{book.data.PublishDate}</Col>
                    <Col className="col-2" >{book.data.Price}$</Col>
                    <Col className="col-1"><Button className='bg-success'><i class="fas fa-book"></i></Button></Col>
                    <Col className="col-1"><Button className='bg-danger' onClick={() => { setBookToDelete(book); setShowDeleteModal(true); }}><i class="fas fa-trash"></i></Button></Col>
                    <Col className="col-3 image" >
                        <img src={book.data.ImageURL} alt={book.data.Name}  />
                    </Col>
                    <Modal key={book.id + "-modal"} centered show={showDeleteModal && bookToDelete?.id === book.id} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header>
                            <Modal.Title>Comfirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className='m-2'>Do you want to delete "{book.data.Name}"?</Row>
                            <Row className='m-2 d-flex flex-row-reverse'>
                                <Button className='m-2 col-3 bg-secondary' onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                                <Button className='m-2 col-3 bg-danger' onClick={()=>handleDelete(book.id)}>Delete</Button>
                            </Row>
                        </Modal.Body>
                    </Modal>
                    </Row>
                ))}
        </Card>
    </Container>
  )
}

export default AdminPages