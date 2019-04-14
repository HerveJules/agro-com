import express from 'express';
import user from './routes/user'

const app = express();

    
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({message : 'welcome to agro-com app'})    
})
app.use(user);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app;