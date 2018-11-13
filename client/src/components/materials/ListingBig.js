import React, { Component } from 'react';
import {
    Grid,
    CardMedia,
    Divider,
    Typography,
    ListItem,
    TextField,
    Card,
    CardContent,
    CardActions,
    Button,
} from '@material-ui/core';
import Thumbnail from './adminDashboard/Thumbnail';
import { compiler } from 'markdown-to-jsx';

export class ListingBig extends Component {
    state = {
        selectedThumbnail: 0,
        quantity: 0,
    };

    addToCart = (listing, quantity) => {
        // pass the whole (listing, quantity) in here from button will handle API stuff later
    };

    buyItNow = (listing, quantity) => {
        // pass the whole (listing, quantity) in here from button will handle API stuff later
    };

    render() {
        const { selectedThumbnail, quantity } = this.state;
        const { id, category, createdAt, description, name, price, qty } = this.props.product.listing;
        const { pictures } = this.props.product.pictures;
        const { classes } = this.props;
        const current = pictures[selectedThumbnail];
        return (
            <Grid container spacing={40}>
                {/* PICTURE SECTION START */}
                <Grid item m={4}>
                    <div style={{ marginBottom: '2vh' }} className={classes.pictureContainer}>
                        <CardMedia
                            component="img"
                            alt={current && current.name.replace(/(\.jpg)/, '')}
                            className={classes.mediaLarge}
                            image={current && current.data}
                            title={current && current.name}
                        />
                    </div>
                    {/* <Divider /> */}
                    <Grid container>
                        {pictures.map((e, i) => (
                            <Grid item key={e.name}>
                                <ListItem
                                    button
                                    dense
                                    disableGutters
                                    selected={selectedThumbnail === i}
                                    onClick={() => this.setState({ selectedThumbnail: i })}>
                                    <Thumbnail image={e.data} size={50} />
                                </ListItem>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {/* PICTURE SECTION END */}

                {/* TEXT BODY SECTION START */}
                <Grid item m={8}>
                    <Typography variant={'h5'}>{name}</Typography>
                    <Typography paragraph>
                        Additional subnotes about product can go here, possibly something like on sale or etc
                    </Typography>
                    <Divider style={{ margin: '0 0 1vh 0' }} />
                    <Typography variant={'body2'}>
                        <Grid container spacing={40}>
                            <Grid item>
                                <TextField
                                    id="filled-number"
                                    label="Quantity"
                                    value={quantity}
                                    onChange={event =>
                                        event.target.value > -1 && this.setState({ quantity: event.target.value })
                                    }
                                    type="number"
                                    // className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    error={quantity > qty}
                                />
                            </Grid>
                            <Grid item>{qty > 0 ? `In stock: ${qty}` : `Out of Stock`}</Grid>
                            <Grid item xs={12}>
                                <Card raised style={{ background: '#eeeeee' }}>
                                    <CardContent>
                                        {/* Something here about a sale, possibly. Otherwise */}
                                        <Typography variant={'body2'}>Price: {price}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            onClick={this.buyItNow(this.props.product.listing, quantity)}
                                            size="small">
                                            Buy It Now
                                        </Button>
                                        <Button
                                            onClick={this.addToCart(this.props.product.listing, quantity)}
                                            size="small">
                                            Add to cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                {compiler(description.replace(/\n/gm, '\n\n'))}
                            </Grid>
                        </Grid>
                    </Typography>
                </Grid>
                {/* TEXT BODY SECTION END */}
            </Grid>
        );
    }
}

export default ListingBig;
