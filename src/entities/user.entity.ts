import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

export enum UserRole {
	MERCHANT = 'merchant',
	USER = 'user',
	ADMIN = 'admin',
	MODERATOR = 'moderator',
}

@Entity('Users') // Specify the exact name of the table in the database
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty() // Validate that 'username' is not empty
	username: string;

	@Column()
	firstname: string;

	// loginMethodCode: COGNITO_PASSWORD | google | facebook | gh

	@Column({
		nullable: true,
	})
	lastname: string;

	@Column()
	@IsEmail() // Validate that 'email' contains a valid email address
	@IsNotEmpty()
	email: string;

	@Column()
	hashedpassword: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER
	})
	role: UserRole;

	@Column()
	status: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdat: Date;
}
