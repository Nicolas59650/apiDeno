import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Dinosaur } from "../types/types.ts";
import { Dinosaurs } from "../database/data.ts";

// Get all dinosaurs
const getDinosaurs = ({ response }: { response: any }) => {
  if (Dinosaurs.length) {
    response.body = {
      success: true,
      data: Dinosaurs,
    };
  } else {
    response.body = {
      success: true,
      message: "No Dinosaurs, please add one",
    };
  }
};

// Get one dinosaur by id
const getDinosaur = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const selectedDino: Dinosaur | undefined = Dinosaurs.find((dino) =>
    dino.id === params.id
  );
  if (selectedDino) {
    response.status = 200;
    response.body = {
      success: true,
      data: selectedDino,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Dinosaur Not Found",
    };
  }
};

// Add a new dinosaur.
const addDinosaur = async (
  { request, response }: { request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      sucess: false,
      message: "Can not create dinosaur with no data",
    };
  } else {
    const { value } = await request.body();
    const dinosaur: Dinosaur = value;
    dinosaur.id = v4.generate();
    Dinosaurs.push(dinosaur);
    response.status = 201;
    response.body = {
      success: true,
      data: dinosaur,
    };
  }
};

// Delete one dinosaur.
const deleteDinosaur = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const filteredDinosaurs: Array<Dinosaur> = Dinosaurs.filter(
    (dinosaur: Dinosaur) => (dinosaur.id !== params.id),
  );
  if (filteredDinosaurs.length === Dinosaurs.length) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Not found",
    };
  } else {
    Dinosaurs.splice(0, Dinosaurs.length);
    Dinosaurs.push(...filteredDinosaurs);
    response.status = 200;
    response.body = {
      success: true,
      msg: `Dinosaur with id ${params.id} has been deleted`,
    };
  }
};

// Update one dinosaur.
const updateDinosaur = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const getDinosaur: Dinosaur | undefined = Dinosaurs.find(
    (dinosaur: Dinosaur) => dinosaur.id === params.id,
  );
  if (getDinosaur) {
    const { value: updatedDinosaurBody } = await request.body();
    const updatedDinosaurs: Array<Dinosaur> = Dinosaurs.map(
      (dinosaur: Dinosaur) => {
        if (dinosaur.id === params.id) {
          return {
            ...dinosaur,
            ...updatedDinosaurBody,
          };
        } else {
          return dinosaur;
        }
      },
    );

    Dinosaurs.splice(0, Dinosaurs.length);
    Dinosaurs.push(...updatedDinosaurs);
    response.status = 200;
    response.body = {
      success: true,
      msg: `Dinosaur id ${params.id} updated`,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: `Not Found`,
    };
  }
};

export {
  addDinosaur,
  deleteDinosaur,
  getDinosaur,
  getDinosaurs,
  updateDinosaur,
};
