import mongoose from "mongoose"
import SeedRoles from "./roleSeeder.js";
import SeedUsers from "./userSeeder.js";

const seedDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://jandusayjoe14:1VpIMPNLXd2YLlMd@cluster0.g1x9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Failed to connect to MongoDB', err));

        // write the seeder logic here
        await SeedRoles();
        await SeedUsers();

        console.log("Finish Seeding");

        await mongoose.disconnect();
    } catch (error) {
        console.log("Unexpected Error occured while running the seeder");
        console.log(error)
    }
}

seedDatabase();