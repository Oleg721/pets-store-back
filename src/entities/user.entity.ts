import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsDate, IsNotEmpty } from 'class-validator';

@Entity('Users') // Specify the exact name of the table in the database
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty() // Validate that 'username' is not empty
	username: string;

	@Column()
	firstname: string;

	@Column()
	lastname: string;

	@Column()
	@IsEmail() // Validate that 'email' contains a valid email address
	email: string;

	@Column()
	hashedpassword: string;

	@Column()
	role: string;

	@Column()
	status: string;

	@Column()
	@IsDate() // Ensure the correct type
	createdat: Date;

	@Column()
	@IsDate()
	updatedat: Date;
}
