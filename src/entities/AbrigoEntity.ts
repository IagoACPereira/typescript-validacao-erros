import { 
  BeforeInsert,
  BeforeUpdate,
  Column, 
  Entity, 
  JoinColumn, 
  OneToMany, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";
import EnderecoEntity from "./Endereco";
import PetEntity from "./PetEntity";
import { criaSenhaCriptografada } from "../utils/senhaCriptografada";

@Entity()
export default class AbrigoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: EnderecoEntity;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ unique: true })
  celular: string;

  @OneToMany(() => PetEntity, (pet) => pet.abrigo)
  pets!: PetEntity[];

  constructor(
    nome: string,
    email: string,
    senha: string,
    celular: string,
    endereco?: EnderecoEntity,
  ) {
    this.endereco = endereco;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async criptografaSenha(senha: string) {
    this.senha = criaSenhaCriptografada(this.senha);
  }
}