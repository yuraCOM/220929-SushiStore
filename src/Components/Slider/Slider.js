import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselFadeExample() {

    return (
        <Carousel fade variant="dark">
            <Carousel.Item interval={1000} >
                <img
                    className="d-block w-100"
                    src="https://raw.githubusercontent.com/yuraCOM/DataBase/main/images/slider/slider01.jpg"
                    alt="First slide"
                />
                <Carousel.Caption >
                    <h3>Зеленый Дракон</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item >
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    src="https://raw.githubusercontent.com/yuraCOM/DataBase/main/images/slider/slider02.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Ролл Месяца</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://raw.githubusercontent.com/yuraCOM/DataBase/main/images/slider/slider03.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Новинки Меню</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselFadeExample;