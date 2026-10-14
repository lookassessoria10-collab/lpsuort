# Prompts para gerar as imagens das especialidades

As imagens aprovadas de joelho foram geradas por IA. Para as cinco páginas parecerem um conjunto, gere as
demais **na mesma ferramenta** e **anexe `imagens-originais/joelho/hero.jpg` como referência de estilo**
(ChatGPT/Gemini: anexar a imagem; Midjourney: `--sref`). Os prompts estão em inglês porque a maioria das
ferramentas responde melhor assim.

Cada página precisa de 2 imagens: **hero** (vertical) e **sintomas** (horizontal). Especificações completas
em [IMAGENS.md](IMAGENS.md).

## Antes de aprovar cada imagem

- **Anatomia:** o osso em destaque precisa ser o da articulação certa e estar no lugar certo. Confira dedos e mãos.
- **Logo no jaleco:** a IA costuma deformar texto. Se "UORT" sair torto, gere o jaleco liso e aplique o logo
  real (`src/assets/brand/uort-logo.png`) na edição.
- **Sem texto na imagem:** a de sintomas de joelho veio com frase aplicada. As novas não devem ter texto.
- **Resolução:** hero com ≥ 1520 px de largura, sintomas com ≥ 1600 px. Use o upscale da ferramenta, se preciso.
- **Proporção:** se a ferramenta não oferecer 4:5 ou 6:5, gere em uma proporção maior que eu recorto.
- **Pessoas diferentes** em cada especialidade, sem repetir paciente nem cenário.

## Blocos comuns (cole no fim de cada prompt)

**[ESTILO]**
> Photorealistic medical photography, bright high-key lighting, soft diffused daylight, clean white and very
> pale teal background, shallow depth of field. A subtle, anatomically accurate, translucent X-ray-style
> overlay of the bones of the joint, light blue-white, with a small soft warm orange glow at the joint, same
> visual style as the reference image. Calm, reassuring mood. No text, no captions, no watermark. Avoid:
> exaggerated pain expressions, sci-fi hologram effects, extra or distorted fingers, incorrect anatomy.

**[MÉDICO]**
> The orthopedic doctor wears a white lab coat with a small teal "UORT" logo on the chest; the doctor's face
> is out of frame, only hands, arms and torso are visible.

**[COMPOSIÇÃO HERO]**
> Vertical 4:5. Subject in the right two-thirds of the frame; the left third is empty plain soft white
> background. Keep the joint near the vertical center so a horizontal mobile crop still works.

**[COMPOSIÇÃO SINTOMAS]**
> Horizontal 6:5. The bottom-right corner (about one third of the width and height) is empty, softly
> blurred background.

> Se a decisão for **tirar o efeito de raio X** de todas as páginas, apague a segunda frase do [ESTILO] e
> regenere também as de joelho.

---

## Coluna

**Hero:** Close-up of an orthopedic doctor examining the lower back of a Brazilian man in his 40s, seated on
an examination table with his back to the camera and his lower back uncovered. The doctor's hands gently
press on the lumbar spine. Overlay of the lumbar vertebrae, with the glow at the lower lumbar discs.
[MÉDICO] [COMPOSIÇÃO HERO] [ESTILO]

**Sintomas:** A Brazilian woman in her 30s in business-casual clothes getting up from an office chair, one
hand pressing her lower back, face turned away or out of frame, calm expression. Overlay of the lumbar spine
on her lower back, with a soft warm red-orange glow. Blurred bright office background.
[COMPOSIÇÃO SINTOMAS] [ESTILO]

## Ombro

**Hero:** An orthopedic doctor examining the right shoulder of a seated Brazilian man in his 50s wearing a
sleeveless shirt: one hand rests on top of the shoulder, the other gently guides the arm into elevation.
Overlay of the shoulder joint (humeral head, glenoid, clavicle and acromion), with the glow at the joint.
[MÉDICO] [COMPOSIÇÃO HERO] [ESTILO]

**Sintomas:** A Brazilian woman in her 40s reaching up toward a high kitchen shelf and stopping, her other
hand on her shoulder; shot from the side and slightly behind, face mostly out of frame. Overlay of the
shoulder joint, with a soft warm red-orange glow. [COMPOSIÇÃO SINTOMAS] [ESTILO]

## Quadril

**Hero:** A Brazilian woman in her 60s lying on her back on an examination table, wearing comfortable
shorts. The orthopedic doctor's hands hold her bent knee and ankle, flexing and gently rotating the hip.
Overlay of the hip joint (femoral head inside the acetabulum, part of the pelvis), with the glow at the joint.
[MÉDICO] [COMPOSIÇÃO HERO] [ESTILO]

**Sintomas:** A Brazilian man in his 50s walking through a bright living room, one hand on the side of his
hip, face out of frame. Overlay of the hip joint, with a soft warm red-orange glow.
[COMPOSIÇÃO SINTOMAS] [ESTILO]

## Pé e Tornozelo

**Hero:** A young Brazilian woman, a recreational runner, seated on the edge of an examination table with
one bare foot. The orthopedic doctor's hands hold her heel and forefoot, testing ankle mobility. Overlay of
the ankle and foot bones (tibia, fibula, talus, calcaneus), with the glow at the ankle joint.
[MÉDICO] [COMPOSIÇÃO HERO] [ESTILO]

**Sintomas:** A young Brazilian man in running clothes sitting on a bench by a running track, holding his
ankle with both hands, one running shoe off beside him, face out of frame. Overlay of the ankle bones, with
a soft warm red-orange glow. [COMPOSIÇÃO SINTOMAS] [ESTILO]

## Joelho (regerar em alta resolução)

**Hero:** Close-up of an orthopedic doctor examining the knee of a seated Brazilian man in his 40s: one hand
on top of the knee, the other on the shin. Overlay of the knee joint (femur, patella, tibia), with the glow at
the joint. [MÉDICO] [COMPOSIÇÃO HERO] [ESTILO]

**Sintomas:** A Brazilian man in dark athletic shorts, standing, holding his knee with both hands, cropped
from the waist down. Overlay of the knee joint, with a soft warm red-orange glow. Blurred bright background.
[COMPOSIÇÃO SINTOMAS] [ESTILO]

---

## Estrutura da clínica: precisa ser foto real

A seção "Por que escolher a UORT?" apresenta a imagem como a estrutura da clínica. Uma imagem gerada por IA
ali passaria por real e induziria o paciente a erro. Use foto da recepção, de um consultório ou da área de
fisioterapia, sem pacientes identificáveis.
