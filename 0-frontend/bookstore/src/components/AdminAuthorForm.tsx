import { useEffect, useMemo, useState } from "react";
import { Button, Input, Link, Skeleton, Textarea } from "@nextui-org/react";
import { Author } from "../domain/Author";

type AdminAuthorFormProps = {
  author: Author | undefined;
  save: (author: Author) => Promise<void>;
  isLoading: boolean;
};
export default function AdminAuthorForm(props: AdminAuthorFormProps) {
  const { author, save, isLoading } = props;

  const [id, setId] = useState(undefined as number | undefined);
  const [name, setName] = useState(undefined as string | undefined);
  const [age, setAge] = useState(undefined as number | undefined);
  const [description, setDescripton] = useState(
    undefined as string | undefined
  );
  const [image, setImage] = useState(undefined as string | undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    undefined as string | undefined
  );

  useEffect(() => {
    // If an Author is provided, then populate the form.
    if (author !== undefined) {
      setId(author.id);
      setName(author.name);
      setAge(author.age);
      setDescripton(author.description);
      setImage(author.image);
    }
  }, [author]);

  const isNameInvalid = useMemo(() => {
    return !(name !== undefined && name.length > 0 && name.length < 512);
  }, [name]);

  const isAgeInvalid = useMemo(() => {
    return !(age !== undefined && age > 0 && age < 150);
  }, [age]);

  const isDescriptionInvalid = useMemo(() => {
    return !(
      description !== undefined &&
      description.length > 1 &&
      description.length < 512
    );
  }, [description]);

  const isImageInvalid = useMemo(() => {
    return !(image !== undefined && image.length > 1 && image.length < 512);
  }, [image]);

  const isFormValid = useMemo(() => {
    return (
      !isNameInvalid &&
      !isAgeInvalid &&
      !isDescriptionInvalid &&
      !isImageInvalid
    );
  }, [isNameInvalid, isAgeInvalid, isDescriptionInvalid, isImageInvalid]);

  const isAuthor = useMemo(() => {
    return undefined !== author;
  }, [author]);

  const safelySetAge = (value: string) => {
    try {
      const newAge = parseInt(value);
      setAge(newAge);
    } catch (ex) {
      console.log(`Invalid age '${value}'`);
    }
  };

  const doSave = async () => {
    setErrorMessage(undefined);

    if (isFormValid) {
      setIsSaving(true);
      save({
        id: undefined,
        name: name ? name : "",
        age: age ? age : 0,
        description: description ? description : "",
        image: image ? image : "",
      })
        .then(() => setIsSaving(false))
        .catch((ex) => {
          setErrorMessage(ex.toString());
          setIsSaving(false);
        });
    } else {
      setErrorMessage("Form not valid.");
    }
  };

  return (
    <div>
      <Link href="/admin" color="foreground" className="mb-4">
        Back
      </Link>
      <h1 className="font-extrabold text-4xl mb-4">
        {isAuthor ? "Update" : "Create"} Author Form
      </h1>
      <p className="mb-8">
        Use this form to {isAuthor ? "update" : "create"} an author.
      </p>
      {isAuthor && (
        <Skeleton isLoaded={!isLoading}>
          <Input label="ID" value={id?.toString()} disabled className="mb-4" />
        </Skeleton>
      )}

      <Skeleton isLoaded={!isLoading}>
        <Input
          label="Name"
          description="The name of the author"
          value={name}
          onValueChange={setName}
          className="mb-4"
          isInvalid={isNameInvalid}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <Input
          type="number"
          label="Age"
          description="The author's age in years"
          value={age?.toString()}
          onValueChange={safelySetAge}
          className="mb-4"
          isInvalid={isAgeInvalid}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <Textarea
          label="Description"
          description="The author's bio, a description of themselves."
          value={description}
          onValueChange={setDescripton}
          className="mb-4"
          isInvalid={isDescriptionInvalid}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <Input
          label="Image Filename"
          description="The filename of the author's image. (A workaround as we don't have an image server)."
          value={image}
          onValueChange={setImage}
          isInvalid={isImageInvalid}
        />
      </Skeleton>

      <div className="mt-4 text-right">
        <Skeleton isLoaded={!isLoading}>
          {errorMessage && (
            <span className="text-danger mr-4">{errorMessage}</span>
          )}
          <Button isLoading={isSaving} onClick={doSave}>
            {isAuthor ? "Update Author" : "Create Author"}
          </Button>
        </Skeleton>
      </div>
    </div>
  );
}
