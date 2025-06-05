import { Card, Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Navbar, Nav, Form, Button, ProgressBar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './Index.css';
import { useState } from 'react';
import SellModal from './SellModal';
import { useProducts } from '../data/ProductContext';
// import TpsItem from './TpsItem';
import { Route, Routes } from 'react-router';
function Index() {
    const [isHoveredHot, setIsHoveredHot] = useState(false);
    const [isHoveredHeart, setIsHoveredHeart] = useState(false);


    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');

    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능
    let countSortedProducts = [...products].sort(
        (b, a) => a.count - b.count
    );
    countSortedProducts = countSortedProducts.slice(0, 4);

    let heartSortedProducts = [...products].sort(
        (b, a) => a.heart.length - b.heart.length
    );
    heartSortedProducts = heartSortedProducts.slice(0, 4);

    const [showSellModal, setShowSellModal] = useState(false);
    // const item={id:'아이디1', itemnum:13,itemname:'',itemcategory:'전체',itemprice:0,itemrecruitprice:0,itemrecruitperiodstart:'',itemrecruitperiodend:'',itemcarousellink:['','',''],itemintro:'',itempicturelink:'',itemvideolink:''}
    // const[sellItem,setSellItem]=useState({item});
    return (
        <div className='index-all-container'>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary w-100 h-100">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">로고</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                <Nav.Link as={Link} to="/list" style={{ marginRight: '10px' }}>
                                    후원하기
                                </Nav.Link>
                                <Form className="d-flex">
                                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                    <Button variant="outline-success" style={{ marginRight: '10px' }} onClick={() => navigate(`/list?keyword=${encodeURIComponent(searchKeyword)}`)}>
                                        Search
                                    </Button>
                                </Form>
                                <Nav.Link as={Link} to={localStorage.getItem('id') == null ? '/login' : '/mypage'}>{localStorage.getItem('id') == null ? '로그인' : localStorage.getItem('id')}</Nav.Link>
                                <Nav.Link onClick={() => {
                                    if (localStorage.getItem('id') != null)
                                        setShowSellModal(true);
                                    else
                                        alert('로그인 하세요');

                                }} href="#action3">펀딩신청</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main className='index-main'>
                <Container>
                    <Carousel style={{ width: '100%', height: '400px' }}>
                        <Carousel.Item style={{ width: '100%', height: '400px' }}>
                            <img
                                className="d-block"
                                src="/images/basketball1.jpeg"
                                alt="First slide"
                                style={{ width: '100%', height: '400px' }}
                            />
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '400px' }}>
                            <img
                                className="d-block"
                                src="/images/soccerball1.jpg"
                                alt="Second slide"
                                style={{ width: '100%', height: '400px' }}
                            />
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '400px' }}>
                            <img
                                className="d-block"
                                src="/images/food1.jpg"
                                alt="Third slide"
                                style={{ width: '100%', height: '400px' }}
                            />
                        </Carousel.Item>
                    </Carousel>
                    <h2 className={`hotfunding ${isHoveredHot ? 'visible' : ''}`}>인기펀딩</h2>
                    {
                        <Row className='custom-row fade-in-area' onMouseEnter={()=>setIsHoveredHot(true)} onMouseLeave={()=>setIsHoveredHot(false)}>
                            {
                                countSortedProducts.map((item) => {
                                    return (
                                        <Col md={3}>
                                            <Card>
                                                <Link to={`/item/${item.no}`}>
                                                    <Card.Img variant="top" src={item.imglink} />
                                                </Link>
                                                <Card.Body>
                                                    <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Card.Title>{item.name}</Card.Title>
                                                    </Link>
                                                    <Card.Text style={{ textAlign: 'left' }}>{item.companyname}</Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>시작일자:</strong>{item.startdate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>마감일자:</strong>{item.enddate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <ProgressBar now={item.percent} label={`${item.percent}%`} />
                                                </Card.Footer>
                                            </Card>
                                        </Col>

                                    )

                                })
                            }
                        </Row>
                    }
                    <h2 className={`heartfunding ${isHoveredHeart ? 'visible' : ''}`}>좋아요 펀딩💘</h2>
                    {
                        <Row className='custom-row fade-in-area' onMouseEnter={()=>setIsHoveredHeart(true)} onMouseLeave={()=>setIsHoveredHeart(false)}>
                            {
                                heartSortedProducts.map((item) => {
                                    return (
                                        <Col md={3}>
                                            <Card>
                                                <Link to={`/item/${item.no}`}>
                                                    <Card.Img variant="top" src={item.imglink} />
                                                </Link>
                                                <Card.Body>
                                                    <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Card.Title>{item.name}</Card.Title>
                                                    </Link>
                                                    <Card.Text style={{ textAlign: 'left' }}>{item.companyname}</Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>시작일자:</strong>{item.startdate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>마감일자:</strong>{item.enddate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <ProgressBar now={item.percent} label={`${item.percent}%`} />
                                                </Card.Footer>
                                            </Card>
                                        </Col>

                                    )

                                })
                            }
                        </Row>
                    }
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: '100px' }}>
                        <iframe
                            src="https://www.youtube.com/embed/xTZlP0rCUkk"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Funders Introduction"
                        ></iframe>
                    </div>

                  

                    <Carousel style={{ width: '100%', height: '500px' }}>
                        <Carousel.Item style={{ width: '100%', height: '500px' }}>
                            <Row className="ad-slide1 align-items-center" style={{ height: '100%' }}>
                                <Col md={6} className="ad-image-container">
                                    <img
                                        className="d-block w-100 zoom-in"
                                        src="/images/soccerball1.jpg"
                                        alt="광고 이미지"
                                        style={{ height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </Col>
                                <Col md={6} className="ad-text-area">
                                    <div className="ad-text">
                                        <h1 className="slide-in">⚽ 신제품 축구공 등록!</h1>
                                        <h2>축구공 1호</h2>
                                        <h3>축구공회사</h3>
                                        <p>지금 등록 할인가로 만나보세요!</p>
                                        <span style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>10000원</span>
                                        <h2 className='text-jump'>5000원</h2>
                                        <br></br>
                                        <Button onClick={() => navigate('item/1')} className="blink-button1" variant="danger">지금 보러가기</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '500px' }}>
                            <Row className="ad-slide2 align-items-center" style={{ height: '100%' }}>
                                <Col md={6} className="ad-image-container">
                                    <img
                                        className="d-block w-100 zoom-in"
                                        src="/images/basketball1.jpeg"
                                        alt="광고 이미지"
                                        style={{ height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </Col>
                                <Col md={6} className="ad-text-area">
                                    <div className="ad-text">
                                        <h1 className="slide-in">⚽ 신제품 축구공 등록!</h1>
                                        <h2>축구공 1호</h2>
                                        <h3>축구공회사</h3>
                                        <p>지금 등록 할인가로 만나보세요!</p>
                                        <span style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>10000원</span>
                                        <h2 className='text-jump'>5000원</h2>
                                        <br></br>
                                        <Button onClick={() => navigate('item/1')} className="blink-button1" variant="danger">지금 보러가기</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '500px' }}>
                            <Row className="ad-slide3 align-items-center" style={{ height: '100%' }}>
                                <Col md={6} className="ad-image-container">
                                    <img
                                        className="d-block w-100 zoom-in"
                                        src="/images/food1.jpg"
                                        alt="광고 이미지"
                                        style={{ height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </Col>
                                <Col md={6} className="ad-text-area">
                                    <div className="ad-text">
                                        <h1 className="slide-in">⚽ 신제품 축구공 출시!</h1>
                                        <h2>축구공 1호</h2>
                                        <h3>축구공회사</h3>
                                        <p>지금 등록 할인가로 만나보세요!</p>
                                        <span style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>10000원</span>
                                        <h2 className='text-jump'>5000원</h2>
                                        <br></br>
                                        <Button onClick={() => navigate('item/1')} className="blink-button1" variant="danger">지금 보러가기</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </main>
            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} ></SellModal>
            <footer>
                <h2>5판3선</h2>
                <h6>주소: 천안시 동남구 대흥로 215 백자빌딩 7층</h6>
                <h6>연락처: 041-561-1126</h6>
                <h6><a href='https://www.notion.so/20322dc2b142800f9264d7662c846fa5?source=copy_link'>이용가이드</a></h6>
            </footer>
        </div>
    );
}
export default Index;