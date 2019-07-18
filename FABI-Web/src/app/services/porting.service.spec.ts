import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Porting } from "./porting.service";
import { DebugElement } from '@angular/core';

describe("Porting service", () =>{

    let component : Porting;
    let fixture : ComponentFixture<Porting>;
    let de : DebugElement;

    beforeEach(async(() =>{
        TestBed.configureTestingModule({
            declarations: [
                Porting
              ]
        }).compileComponents();
    }));

    beforeEach(() =>{
        fixture = TestBed.createComponent(Porting);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        
        fixture.detectChanges();
    });

    it("Should create", () =>{
        expect(component).toBeTruthy();
    });

    it("Porting given empty file", () =>{
        const text = "";
        const jsonObj = component.convertToJSON(text);

        expect(jsonObj).toBeNull();
    });

    it("Porting given correct ; separated CSV format should pass", () =>{
        const text = "heading1;heading2;heading3\nthing1;thing2;thing3";
        const jsonObj = component.convertToJSON(text);

        expect(jsonObj[0]["heading1"]).toEqual("thing1");
        expect(jsonObj[0]["heading2"]).toEqual("thing2");
        expect(jsonObj[0]["heading3"]).toEqual("thing3");
    });

    it("Porting given incorrect , separated CSV format should fail", () =>{
        const text = "heading1,heading2,heading3\nthing1,thing2,thing3";
        const jsonObj = component.convertToJSON(text);

        expect(jsonObj[0]["heading1,heading2,heading3"]).toEqual("thing1,thing2,thing3");
    });

    it("Reverse Porting given correct json data should pass", () =>{
        const dbjson = {
            "docs": [
              {
                "num": "1",
                "species": "bug1",
                "id": "1561418891909"
              },
              {
                "species": "bug2",
                "id": "1561418891913",
                "num": "2"
              },
              {
                "species": "wasp",
                "num": "3",
                "id": "1561418451913"
              }
            ]
          }

        const result = component.extractDatabase(dbjson, "databaseName");
        const lines = result.split("\r\n");

        expect(lines[0]).toContain("num");
        expect(lines[0]).toContain("species");
        expect(lines[0]).toContain("id");
        expect(lines[1]).toContain("1561418891909");
        expect(lines[2]).toContain("1561418891913");
        expect(lines[3]).toContain("1561418451913");
    });

    it("Reverse Porting given null json object should fail", () =>{
        const result = component.extractDatabase(null, "databaseName");
        expect(result).toEqual("");
    });

});