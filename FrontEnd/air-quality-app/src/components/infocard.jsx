import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

const Infocard = ({ image, alt, heading, style, text }) => {

    return (
        <Card
            style={{
                maxWidth: '30rem',
                textAlign: 'center',
                border: '1px solid #F7F7F2'
            }}
        >
            {image && (
                <CardMedia
                    component="img"
                    image={image}
                    alt={alt}
                    style={style}
                />
            )}

            <CardContent>
                <Typography
                    variant="h5"
                    component="h3"
                    style={{ marginTop: '2rem' }}
                >
                    {heading}
                </Typography>
                <Typography variant="body2" component="p">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
};

Infocard.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    heading: PropTypes.string,
    style: PropTypes.object,
    text: PropTypes.string,
};

export default Infocard;
