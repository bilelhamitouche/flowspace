import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @IsString()
  @IsNotEmpty()
  assignedTo: string;
}
