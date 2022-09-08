import { ClassUtils } from "../utils/ClassUtils";
import { AnimationClip } from "./animation/AnimationClip";
import { Animator } from "./component/Animator";
import { AnimatorControllerLayer } from "./component/AnimatorControllerLayer";
import { AnimatorState } from "./component/AnimatorState";
import { AvatarMask } from "./component/AvatarMask";
import { Sprite3D } from "./core/Sprite3D";
import { Camera } from "./core/Camera";
import { Gradient } from "./core/Gradient";
import { DirectionLight } from "./core/light/DirectionLight";
import { LightSprite } from "./core/light/LightSprite";
import { PointLight } from "./core/light/PointLight";
import { SpotLight } from "./core/light/SpotLight";
import { BlinnPhongMaterial } from "./core/material/BlinnPhongMaterial";
import { EffectMaterial } from "./core/material/EffectMaterial";
import { ExtendTerrainMaterial } from "./core/material/ExtendTerrainMaterial";
import { Material } from "./core/material/Material";
import { PBRSpecularMaterial } from "./core/material/PBRSpecularMaterial";
import { PBRStandardMaterial } from "./core/material/PBRStandardMaterial";
import { SkyBoxMaterial } from "./core/material/SkyBoxMaterial";
import { SkyPanoramicMaterial } from "./core/material/SkyPanoramicMaterial";
import { SkyProceduralMaterial } from "./core/material/SkyProceduralMaterial";
import { UnlitMaterial } from "./core/material/UnlitMaterial";
import { WaterPrimaryMaterial } from "./core/material/WaterPrimaryMaterial";
import { MeshFilter } from "./core/MeshFilter";
import { MeshRenderer } from "./core/MeshRenderer";
import { MeshSprite3D } from "./core/MeshSprite3D";
import { Burst } from "./core/particleShuriKen/module/Burst";
import { ColorOverLifetime } from "./core/particleShuriKen/module/ColorOverLifetime";
import { Emission } from "./core/particleShuriKen/module/Emission";
import { FrameOverTime } from "./core/particleShuriKen/module/FrameOverTime";
import { GradientAngularVelocity } from "./core/particleShuriKen/module/GradientAngularVelocity";
import { GradientColor } from "./core/particleShuriKen/module/GradientColor";
import { GradientDataInt } from "./core/particleShuriKen/module/GradientDataInt";
import { GradientDataNumber } from "./core/particleShuriKen/module/GradientDataNumber";
import { GradientSize } from "./core/particleShuriKen/module/GradientSize";
import { GradientVelocity } from "./core/particleShuriKen/module/GradientVelocity";
import { RotationOverLifetime } from "./core/particleShuriKen/module/RotationOverLifetime";
import { BaseShape } from "./core/particleShuriKen/module/shape/BaseShape";
import { BoxShape } from "./core/particleShuriKen/module/shape/BoxShape";
import { CircleShape } from "./core/particleShuriKen/module/shape/CircleShape";
import { ConeShape } from "./core/particleShuriKen/module/shape/ConeShape";
import { HemisphereShape } from "./core/particleShuriKen/module/shape/HemisphereShape";
import { SphereShape } from "./core/particleShuriKen/module/shape/SphereShape";
import { SizeOverLifetime } from "./core/particleShuriKen/module/SizeOverLifetime";
import { StartFrame } from "./core/particleShuriKen/module/StartFrame";
import { TextureSheetAnimation } from "./core/particleShuriKen/module/TextureSheetAnimation";
import { VelocityOverLifetime } from "./core/particleShuriKen/module/VelocityOverLifetime";
import { ShuriKenParticle3D } from "./core/particleShuriKen/ShuriKenParticle3D";
import { ShurikenParticleMaterial } from "./core/particleShuriKen/ShurikenParticleMaterial";
import { ShurikenParticleRenderer } from "./core/particleShuriKen/ShurikenParticleRenderer";
import { ShurikenParticleSystem } from "./core/particleShuriKen/ShurikenParticleSystem";
import { ReflectionProbe } from "./core/reflectionProbe/ReflectionProbe";
import { BaseRender } from "./core/render/BaseRender";
import { RenderableSprite3D } from "./core/RenderableSprite3D";
import { Lightmap } from "./core/scene/Lightmap";
import { Sprite } from "../display/Sprite";
import { Scene3D } from "./core/scene/Scene3D";
import { SimpleSkinnedMeshRenderer } from "./core/SimpleSkinnedMeshRenderer";
import { SimpleSkinnedMeshSprite3D } from "./core/SimpleSkinnedMeshSprite3D";
import { SkinnedMeshRenderer } from "./core/SkinnedMeshRenderer";
import { SkinnedMeshSprite3D } from "./core/SkinnedMeshSprite3D";
import { TrailFilter } from "./core/trail/TrailFilter";
import { TrailMaterial } from "./core/trail/TrailMaterial";
import { TrailRenderer } from "./core/trail/TrailRenderer";
import { TrailSprite3D } from "./core/trail/TrailSprite3D";
import { Transform3D } from "./core/Transform3D";
import { SphericalHarmonicsL2 } from "./graphics/SphericalHarmonicsL2";
import { BoundBox } from "./math/BoundBox";
import { Color } from "./math/Color";
import { Quaternion } from "./math/Quaternion";
import { Vector2 } from "./math/Vector2";
import { Vector3 } from "./math/Vector3";
import { Vector4 } from "./math/Vector4";
import { Viewport } from "./math/Viewport";
import { Mesh } from "./resource/models/Mesh";
import { SkyRenderer } from "./resource/models/SkyRenderer";
import { TextureCube } from "./resource/TextureCube";
import { DirectionLightCom } from "./core/light/DirectionLightCom";
import { PointLightCom } from "./core/light/PointLightCom";
import { SpotLightCom } from "./core/light/SpotLightCom";

import "./loaders/AnimationClipLoader";
import "./loaders/CubemapLoader";
import "./loaders/MaterialLoader";
import "./loaders/MeshLoader";
import "./loaders/SimpleAnimatorTextureLoader";
import "./loaders/HierarchyParserV2";
import "./loaders/AvatarMaskLoader";
import "./loaders/ShaderLoader";

import { Bounds } from "./math/Bounds";

let c = ClassUtils.regClass;
c("Sprite3D", Sprite3D);
c("Scene3D", Scene3D);
c("Camera", Camera);
c("LightSprite", LightSprite);
c("DirectionLight", DirectionLight);
c("PointLight", PointLight);
c("SpotLight", SpotLight);
c("DirectionLightCom", DirectionLightCom);
c("PointLightCom", PointLightCom);
c("SpotLightCom", SpotLightCom);
c("RenderableSprite3D", RenderableSprite3D);
c("MeshSprite3D", MeshSprite3D);
c("MeshFilter", MeshFilter);
c("BaseRender", BaseRender);
c("MeshRenderer", MeshRenderer);
c("SimpleSkinnedMeshSprite3D", SimpleSkinnedMeshSprite3D);
c("SkinnedMeshSprite3D", SkinnedMeshSprite3D);
c("SkinnedMeshRenderer", SkinnedMeshRenderer);
c("SimpleSkinnedMeshRenderer", SimpleSkinnedMeshRenderer);
c("SkyRenderer", SkyRenderer);
c("TrailSprite3D", TrailSprite3D);
c("TrailFilter", TrailFilter);
c("TrailRenderer", TrailRenderer);
c("Gradient", Gradient);
c("Transform3D", Transform3D);
c("Lightmap", Lightmap);
c("ReflectionProbe", ReflectionProbe);
c("SphericalHarmonicsL2", SphericalHarmonicsL2);
c("Vector2", Vector2);
c("Vector3", Vector3);
c("Vector4", Vector4);
c("Quaternion", Quaternion);
c("Color", Color);
c("Viewport", Viewport);
c("Bounds", Bounds);
c("BoundBox", BoundBox);
c("TextureCube", TextureCube);
c("Mesh", Mesh);

c("Animator", Animator);
c("AnimatorControllerLayer", AnimatorControllerLayer);
c("AnimatorState", AnimatorState);
c("AnimationClip", AnimationClip);
c("AvatarMask", AvatarMask);

c("Material", Material);
c("BlinnPhongMaterial", BlinnPhongMaterial);
c("EffectMaterial", EffectMaterial);
c("ExtendTerrainMaterial", ExtendTerrainMaterial);
c("PBRSpecularMaterial", PBRSpecularMaterial);
c("PBRStandardMaterial", PBRStandardMaterial);
c("SkyBoxMaterial", SkyBoxMaterial);
c("SkyPanoramicMaterial", SkyPanoramicMaterial);
c("SkyProceduralMaterial", SkyProceduralMaterial);
c("UnlitMaterial", UnlitMaterial);
c("WaterPrimaryMaterial", WaterPrimaryMaterial);
c("ShurikenParticleMaterial", ShurikenParticleMaterial);
c("TrailMaterial", TrailMaterial);

c("ShuriKenParticle3D", ShuriKenParticle3D);
c("ShurikenParticleRenderer", ShurikenParticleRenderer);
c("ShurikenParticleSystem", ShurikenParticleSystem);
c("Burst", Burst);
c("Emission", Emission);
c("BaseShape", BaseShape);
c("BoxShape", BoxShape);
c("CircleShape", CircleShape);
c("ConeShape", ConeShape);
c("HemisphereShape", HemisphereShape);
c("SphereShape", SphereShape);
c("FrameOverTime", FrameOverTime);
c("GradientAngularVelocity", GradientAngularVelocity);
c("GradientColor", GradientColor);
c("GradientDataInt", GradientDataInt);
c("GradientDataNumber", GradientDataNumber);
c("GradientSize", GradientSize);
c("GradientVelocity", GradientVelocity);
c("StartFrame", StartFrame);
c("TextureSheetAnimation", TextureSheetAnimation);
c("ColorOverLifetime", ColorOverLifetime);
c("RotationOverLifetime", RotationOverLifetime);
c("SizeOverLifetime", SizeOverLifetime);
c("VelocityOverLifetime", VelocityOverLifetime);


c("DirectionLight", DirectionLight);
c("DirectionLightCom", DirectionLightCom);
c("MeshRenderer", MeshRenderer);
c("MeshFilter", MeshFilter);
c("MeshRenderer", MeshRenderer);
c("SkinnedMeshRenderer", SkinnedMeshRenderer);
c("SimpleSkinnedMeshRenderer", SimpleSkinnedMeshRenderer);
c("SkyRenderer", SkyRenderer);