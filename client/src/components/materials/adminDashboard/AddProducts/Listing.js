import React, { Component } from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
class Listing extends Component {
    linesToParagraphs = function(string) {
        return string
            .split('')
            .map(e => (e === '\n' && e.repeat(2)) || e)
            .join('');
    };
    render(props) {
        const { classes, pictures, name, description, selectedThumbnail } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    {pictures.length && (
                        <CardMedia
                            className={classes.media}
                            image={selectedThumbnail && pictures[selectedThumbnail].data}
                            title={pictures[0].name}
                        />
                    )}
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography gutterBottom component="div">
                        {compiler(this.linesToParagraphs(description))}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default Listing;
