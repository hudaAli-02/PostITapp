import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import About from "../Components/about";
import React from "react";



describe("About", ()=>{
    it("should render the About component", ()=>{
        render(<About/>);
        const aboutElement = screen.getByRole('heading', {level: 1})
        expect(aboutElement).toBeInTheDocument();
    });

    it("should have the text about", ()=>{
        render(<About/>);
        const text = screen.queryByText(/about/i);
        expect(text).toBeInTheDocument();
    });
    
    it("should have the image", ()=>{
        render(<About/>);
        const image = screen.getByAltText('devimage')
        expect(image).toHaveClass('userImage');
    });
});

