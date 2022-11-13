import { ApiProperty } from "@nestjs/swagger";

export class Error {
    @ApiProperty()
    error_message: string
    constructor(errorMessage: string){
        this.error_message = errorMessage;
    }
}