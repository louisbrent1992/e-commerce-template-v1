import mongoose, { ConnectOptions } from 'mongoose';

// Optional connection options for Mongoose
interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

class ConnectMongo {
  private dbOptions: MyConnectOptions;

  constructor(private readonly uri: string) {
    // Set the connection options for Mongoose
    this.dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    this.config();
  }

  private config() {
    // Disable the strict mode for Mongoose queries
    mongoose.set('strictQuery', false);

    // Connect to the MongoDB database using the URI and options
    mongoose.connect(this.uri, this.dbOptions);
  }

  public async start(): Promise<void> {
    const db = mongoose.connection;

    // Log any connection errors
    db.on('error', console.error.bind(console, 'connection error:'));

    // Log a successful connection message
    db.once('open', async (): Promise<void> => {
      console.log('Connected to MongoDB!');
    });
  }
}

export default ConnectMongo;
